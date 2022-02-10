import express from "express";
import bodyParser from "body-parser";
import { geh, Register, Login} from "../controller/log.js";

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/log', geh);

router.post('/register', Register);

router.post("/login", Login);

export default router;