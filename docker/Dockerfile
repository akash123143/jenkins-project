# Use an official Jenkins LTS image as a base
FROM jenkins/jenkins:lts

# Switch to root user for installing system packages
USER root

# Install any necessary system packages (example: git)
# You can add more packages as needed
RUN apt-get update && apt-get install -y --no-install-recommends git

# Switch back to the jenkins user
USER jenkins

# Define the ports Jenkins uses
EXPOSE 8080
EXPOSE 50000

# Jenkins runs as the jenkins user, no need for CMD instruction
# The entrypoint is already defined in the base image
