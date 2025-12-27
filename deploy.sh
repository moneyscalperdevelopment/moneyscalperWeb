#!/bin/bash

SERVER_IP="13.51.86.204"
SSH_KEY="$HOME/Downloads/moneyscalperRv.pem"
REMOTE_USER="ubuntu"
REMOTE_DIR="/var/www/html/www.moneyscalper.com"
APP_NAME="moneyscalper-next"

echo "📦 Creating archive and uploading (excluding unnecessary files)..."

tar --exclude=".next" \
    --exclude="node_modules" \
    --exclude=".git" \
    --exclude=".env" \
    --exclude="deploy.sh" \
    -czf - . | ssh -i "$SSH_KEY" "$REMOTE_USER@$SERVER_IP" "
        mkdir -p $REMOTE_DIR &&
        tar -xzf - -C $REMOTE_DIR
    "

# echo "🚀 Installing, building and restarting app on server..."

# ssh -i "$SSH_KEY" "$REMOTE_USER@$SERVER_IP" "
# cd $REMOTE_DIR &&
# npm install &&
# npm run build &&
# pm2 stop $APP_NAME || true &&
# pm2 start npm --name '$APP_NAME' -- start &&
# pm2 save
# "

echo "✅ Deployment completed!"
