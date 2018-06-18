<?php 

session_start();


// Ce fichier n'est pas inclus dans notre repository git
// C'est en fait un fichier appelé à chaque git push sur staging ou sur prod
// Pour l'instant on l'a installé dans le dossier /var/www/hooks
// Tester le web hook : sudo -u www-data php /var/www/hooks/webhook.php

/*
 * Droits d'écritures
 *
 * Webhook :
 sudo chown -R www-data:www-data /var/www/hooks
 *
 * Clé ssh
 sudo chown www-data:symfonyusers /var/www/.ssh
 sudo chown www-data:www-data /var/www/.ssh/config
 sudo chown www-data:www-data /var/www/.ssh/id_rsa_mcdeploy
 sudo chown www-data:www-data /var/www/.ssh/id_rsa_mcdeploy.pub
 sudo chmod 755 /var/www/.ssh
 sudo chmod 600 /var/www/.ssh/id_rsa
 sudo chmod 600 /var/www/.ssh/id_rsa_mcdeploy
 */

// WARNING : la mise à jour prend du temps à s'executer à cause du assetic:dump. Faut compter 10 min.

// On redéfinit la fonction getallheaders si elle n'existe pas
if (!function_exists('getallheaders'))
{
    function getallheaders()
    {
           $headers = '';
       foreach ($_SERVER as $name => $value)
       {
           if (substr($name, 0, 5) == 'HTTP_')
           {
               $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
           }
       }
       return $headers;
    }
}



/**************************************/
/****** PARTIE 0 : Configuration ******/
/**************************************/

$root = '/var/www/hooks/';

// Token que gitlab doit nous envoyer pour s'authentifier
$gitlab_token_expected = 'MgXNB26vhxTJTuLi8eoCSZ3d81VjK6z2t91osknZHOrrspVls2SrkETDXqeTAi9B';

// Fichier de log donnant l'état des HOOKS
$hooksLog = fopen($root.'webhook-react.log', 'a');

// Fichier de log répertoriant le résultats des lignes de commandes de déploiement
$fileName = 'deployReact'.time().'.log';
$deployLogLoc = $root.$fileName;
$shellLog = fopen($deployLogLoc, 'a');
$shellLogUrl = "http://163.172.108.249:61909/".$fileName;

// Fichier enregistrant les paramètres du git pull, pour ne pas dupliquer le git pull
$gitlabPullPath = $root.'gitlabPull-react.log';
$gitlabPullFile = json_decode(file_get_contents($gitlabPullPath),true);
if (empty($gitlabPullFile)) {
    $gitlabPullFile = ["last_commit_id"=>"","last_working_time"=>0];
}

/**************************************************************************/
/****** PARTIE 1 : vérifier que c'est bien gitlab appelle cette page ******/
/**************************************************************************/

fwrite($hooksLog, '======================================================================='.PHP_EOL);

// On enregistre en 1er l'origine de la requête
$all_headers = getallheaders();
$client_ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : "";
fwrite($hooksLog, 'Request on ['.date("Y-m-d H:i:s",(time()+3600)).'] from ['.$client_ip.']'.PHP_EOL);

//On vérifie que c'est bien gitlab qui demande
$client_token = isset($all_headers['X-Gitlab-Token']) ? htmlspecialchars($all_headers['X-Gitlab-Token']) : '';
if ($client_token !== $gitlab_token_expected)
{
    echo "error 403".print_r(getallheaders());
    fwrite($hooksLog, 'Headers : '.json_encode(getallheaders()).PHP_EOL);
    fwrite($hooksLog, "Invalid token [{$client_token}]".PHP_EOL);
    exit(0);
}


// C'est bien gitlab ! Il nous dit qu'il a reçu un git push, et il faut donc que l'on sache sur quelle branche
$json = file_get_contents('php://input');
$data = json_decode($json, true);
$branch = $data["ref"];
$total_commits = intval($data['total_commits_count']);
$commit_id = $data['after'];

// Enrigstrons le nom de cette brand dans notre log
fwrite($hooksLog, 'BRANCH: '.print_r($branch, true).PHP_EOL);
fwrite($hooksLog, 'Data: '.$json.PHP_EOL);

// On a qqchose à executer seulement si c'est un git push sur l'environnement de staging et de master
// Et seulement s'il n'y a pas un autre déploiement en cours.
// Donc par sécurité, pas de git push successif en MOINS de 5 minutes
if (
    in_array($branch,array('refs/heads/master','refs/heads/staging'))
    && (!isset($gitlabPullFile['last_working_time']) || time()-$gitlabPullFile['last_working_time'] > 60*5)
    /*&& $total_commits > 0
    && (!isset($gitlabPullFile['last_commit_id']) || $commit_id != $gitlabPullFile['last_commit_id'])*/
)
{
    $gitlabPullFile['last_working_time'] = time();
    $gitlabPullFile['last_commit_id'] = $commit_id;

    // on enregistre ces paramètres
    $f = fopen($gitlabPullPath,'w+');
    fwrite($f,json_encode($gitlabPullFile));
    fclose($f);

    if ($branch === 'refs/heads/master')
    {
        /* Commandes ne pouvant être executées car sudo :
          HTTPDUSER=`ps aux | grep -E '[a]pache|[h]ttpd|[_]www|[w]ww-data|[n]ginx' | grep -v root | head -1 | cut -d\  -f1`
sudo setfacl -R -m u:"$HTTPDUSER":rwX -m u:`whoami`:rwX  /var/www/my/react_prod/var/cache/ /var/www/my/react_prod/var/logs/
sudo setfacl -dR -m u:"$HTTPDUSER":rwX -m u:`whoami`:rwX  /var/www/my/react_prod/var/cache/ /var/www/my/react_prod/var/logs/
        */
        shell_exec("
        
        echo '======== SSH CONFIG ========'                                                 >> $deployLogLoc
        whoami                                                                              >> $deployLogLoc
        eval $(ssh-agent)                                                                   >> $deployLogLoc
        ssh-add -k /var/www/.ssh/id_rsa_mcdeploy                                            >> $deployLogLoc
        echo ''                                                                             >> $deployLogLoc
        echo '======== GIT DEPLOY ========'                                                 >> $deployLogLoc
        cd /var/www/my/react_prod/                                                                >> $deployLogLoc
        git reset --hard origin/master                                                      >> $deployLogLoc
        git pull origin master                                                              >> $deployLogLoc
        echo ''                                                                             >> $deployLogLoc
        echo ''
        echo '======== END ========'                                                        >> $deployLogLoc
        
        ");

    } 
    else if ($branch === 'refs/heads/staging')
    {
        /* Commandes ne pouvant être executées car sudo :
           HTTPDUSER=`ps aux | grep -E '[a]pache|[h]ttpd|[_]www|[w]ww-data|[n]ginx' | grep -v root | head -1 | cut -d\  -f1`
sudo setfacl -R -m u:"$HTTPDUSER":rwX -m u:`whoami`:rwX  /var/www/my/react_staging/var/cache/  /var/www/my/react_staging/var/logs/
sudo setfacl -dR -m u:"$HTTPDUSER":rwX -m u:`whoami`:rwX  /var/www/my/react_staging/var/cache/  /var/www/my/react_staging/var/logs/
        */

        shell_exec("
        
        echo '======== SSH CONFIG ========'                                                 >> $deployLogLoc
        whoami                                                                              >> $deployLogLoc
        eval $(ssh-agent)                                                                   >> $deployLogLoc
        ssh-add -k /var/www/.ssh/id_rsa_mcdeploy                                            >> $deployLogLoc
        echo ''                                                                             >> $deployLogLoc
        echo '======== GIT DEPLOY ========'                                                 >> $deployLogLoc
        cd /var/www/my/react_staging/                                                             >> $deployLogLoc
        git reset --hard origin/staging                                                     >> $deployLogLoc
        git pull origin staging                                                             >> $deployLogLoc
        echo ''                                                                             >> $deployLogLoc
        echo '======== END ========'                                                        >> $deployLogLoc
        
        ");


    }
    fwrite($hooksLog, 'Shell command lines executed !'.PHP_EOL);

    // On envoie une notif pour dire que tout est ok, avec notre rapport
    shell_exec('curl -X POST --data-urlencode \'payload={"channel": "#prod_deploiement", "username": "Serveur My Capteev New", "text": "[SUCCESS] '.date('d M H:i',(time()+3600)).' : Déploiement sur branche '.$branch.' ok. Résultats ->  '.$shellLogUrl.'", "icon_emoji": ":rocket:"}\' https://hooks.slack.com/services/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');
    // TEST : sudo -u ww-data curl -X POST --data-urlencode 'payload={"channel": "#deploiement", "username": "Serveur My Capteev", "text": "Test notif slack", "icon_emoji": ":ghost:"}' https://hooks.slack.com/services/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

}/*
else if (isset($gitlabPullFile['last_commit_id']) && $commit_id == $gitlabPullFile['last_commit_id'])
{
    fwrite($hooksLog, 'Commit ignored, already deployed !'.PHP_EOL);


}*/
else if (isset($gitlabPullFile['last_working_time']) && time()-$gitlabPullFile['last_working_time'] <= 60*8)
{
    fwrite($hooksLog, 'Commit ignored, another commit is processing !'.PHP_EOL);

    // On envoie une notif pour dire que tout est ok, avec notre rapport
    shell_exec('curl -X POST --data-urlencode \'payload={"channel": "#prod_deploiement", "username": "Serveur My Capteev New", "text": "[FAIL] '.date('d M H:i',(time()+3600)).' : Déploiement sur branche '.$branch.' nok. Another commit is processing !", "icon_emoji": ":rocket:"}\' https://hooks.slack.com/services/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');
}
else
{
    fwrite($hooksLog, 'Branch ignored !'.PHP_EOL);
}

// On enregistre le fichier de log
fwrite($hooksLog, '======================================================================='.PHP_EOL);
$hooksLog and fclose($hooksLog);


// On dit à Gitlab que c'est ok
header("HTTP/1.1 200 OK");


