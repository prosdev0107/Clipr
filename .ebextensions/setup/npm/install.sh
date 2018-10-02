

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

    # Tell wkhtmltopdf where to find lib
    LD_LIBRARY_PATH=/usr/lib:/usr/lib64:/usr/local/lib
    export LD_LIBRARY_PATH

fi


