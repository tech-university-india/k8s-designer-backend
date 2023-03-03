class ProjectDirectoryNotFoundError extends Error {
  constructor(projectId) {
    super(`Project directory: ${projectId} does not exist`);
    this.name = 'ProjectDirectoryNotFoundError';
  }
}

module.exports = ProjectDirectoryNotFoundError;