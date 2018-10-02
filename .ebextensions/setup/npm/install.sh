

npmPath="/usr/bin/npm"

if [ ! -f "$npmPath" ]
then

    # Not installed

    # Get path to install
    curl --silent --location https://rpm.nodesource.com/setup_10.x | sudo bash - &&

    # Install node
    yum -y install nodejs

    # Install npm
    npm install npm@latest -g

fi


