class CustomError extends Error {
  public status: number | undefined;

  constructor(status?: number, message?: string) {
    super(message);
    this.status = status;
    this.name = 'CustomError';
  }
}

export default CustomError;
