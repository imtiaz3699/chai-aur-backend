const asyncHandler = (requestHandler) => {
return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) =>
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
//             success:fals 
// e,
//             message:error.message
//         });
//     }
// }