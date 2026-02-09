#!/bin/bash
# Push to both repositories
echo "🚀 Pushing to both repositories..."

# Push to main repository (new)
echo "📦 Pushing to main repository..."
git push origin main

# Push to old repository (backup)
echo "📦 Pushing to old repository..."
git push oldrepo main

echo "✅ Successfully pushed to both repositories!"
echo "🌐 Main: https://github.com/golu19102003/Society360-Smart-Society-Management-System"
echo "🌐 Backup: https://github.com/civoranexus/FSD120-golu19102003"
