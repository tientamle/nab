// Api Response Helper
class ResponseHelper {
  static success({ message }) {
    return {
      success: true,
      message,
    };
  }

  static error({ message }) {
    return {
      success: false,
      message,
    };
  }

  static data(req, data) {
    return {
      success: true,
      data: data,
    };
  }
}

module.exports = ResponseHelper;
