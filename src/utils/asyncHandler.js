const asyncHandler = (requestHandler) => {
  (req, res, next) => {
    Promise.resolve(requestHandler(req, response, next)).catch((err) =>
      next(err)
    );
  };
};
export { asyncHandler };

// const asyncHanlder = () => {}
// const asyncHanlder = (func) => async() => {
// }
// const asyncHandler = (fn) => async (req,res,next) => {
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success:false,
//             message:error.message
//         });
//     }
// }