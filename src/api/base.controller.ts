export abstract class BaseController {
  protected handleEndpoint<T>(method: () => T): T {
    try {
      return method();
    } catch (e) {
      this.errorHandler(e);
    }
  }

  private errorHandler(e) {
    if (`${e.status}`.startsWith('5')) {
      throw e;
    } else {
      throw e;
    }
  }
}
