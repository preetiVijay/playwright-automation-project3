FROM mcr.microsoft.com/playwright:v1.53.2
# create a workspace
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Fix ownership so the non-root user can access them
RUN chown -R pwuser:pwuser /app
# Switch to Playwright's non-root user
USER pwuser
#install dependencies
RUN npm install
# Copy project files
COPY --chown=pwuser:pwuser . .
# Default command (can be overridden)
# CMD ["npx", "playwright", "test"]
ENTRYPOINT ["npx", "playwright", "test"]