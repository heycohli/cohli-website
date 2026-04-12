#!/bin/bash
# Cohli Website Deploy Script
# Usage:
#   ./deploy.sh preview   → Deploy to a preview URL to check first
#   ./deploy.sh live      → Promote to production (cohli-website.pages.dev)
#   ./deploy.sh           → Same as preview (safe default)

set -e

ACTION="${1:-preview}"

# Stage and commit any new changes (skip if nothing new)
git add .
git commit -m "Update: $(date '+%b %d %H:%M')" 2>/dev/null || true

if [ "$ACTION" = "live" ]; then
  echo ""
  echo "🚀 Deploying to PRODUCTION..."
  echo ""
  npx wrangler pages deploy . --project-name=cohli-website --commit-dirty=true
  echo ""
  echo "✅ Live at https://cohli-website.pages.dev"

elif [ "$ACTION" = "preview" ]; then
  echo ""
  echo "👀 Deploying to PREVIEW..."
  echo ""
  npx wrangler pages deploy . --project-name=cohli-website --commit-dirty=true --branch=preview
  echo ""
  echo "👀 Preview URL is shown above ↑"
  echo "   When happy, run: ./deploy.sh live"

else
  echo "Usage: ./deploy.sh [preview|live]"
  echo "  preview  → Deploy to preview URL (default)"
  echo "  live     → Deploy to production"
  exit 1
fi

# Also push to GitHub for backup
git push origin main 2>/dev/null || true
