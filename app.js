import express from 'express';
import cookieParser from 'cookie-parser';
import hpp from 'hpp';
import xssClean from 'xss-clean';
import helmet from 'helmet';
import cors from 'cors';
import fileupload from 'express-fileupload';
import { limiter } from './config/express.limiter';
import allRoutes from './routes/routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(hpp());
app.use(cookieParser());
app.use(xssClean());
app.use(fileupload({ useTempFiles: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

allRoutes(app);

app.listen(port, () => {
    console.log(`server runnig on port ${port}`);
})
