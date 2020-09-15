import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes
    max: 1000,
    message: "Please try again after an 15min"
});