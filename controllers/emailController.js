import { generateOtp } from "../utils/authutils"
import { emailVerificationTemplate } from "../utils/emailTemplates"
import { sendEmail } from "../utils/emailUtils"
import { sendInternalServerError, sendSuccess } from "../utils/statusUtils"

export const sendEmailVerificationCode = async (req,res)=>{

  try{
    const email= req.email
    const otp = generateOtp()
    const subject = "OTP Verification"
    const html = emailVerificationTemplate(email,otp)
    await sendEmail(email,subject,html)
    return sendSuccess(res,"Email sent successfully")
  }
  catch (err) {
    return sendInternalServerError(res,"Failed to send verification email")
  }
}

