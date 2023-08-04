const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { ACCESS_TOKEN_SECRET } = process.env;


exports.verifyAccessToken = async (req, res, next) => {

  const token = req.header("Authorization");
  if (!token) return res.status(400).json({ status: false, msg: "Token not found" });
  let user;
  try {
    user = jwt.verify(token, "https://jwt.io/#debugger-io?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImsxMjM0NSJ9.eyJzdWIiOiJQcm9qZWN0IiwibmFtZSI6IkFydW4gUHJhc2F0aCIsImFkbWluIjp0cnVlLCJpYXQiOjE1MTYyMzkwMjJ9.DYjIs-KZ1Gz3u6QBZPoCDczto07or51LrU3SUJ1wZ-Jm33GYbAnbWIvnhAoBFnhvVUQde-0Ktf-43sVJhprBTbqRLGPXaUdrbWVD5_axrFDPvuaRNAx6SU7cEcx4_cosaM7tNmil-B_8aHUZ_qrbyA3W0KtCoBgi7zwBQGBzDoLhJPX4HB7URmPEWmXNScfxqhXRqd4fAAjFaLWemS-_Ss4hOausc2jPV3OcJMHFF9v0Lst6fOIsMn-UGua7hvBq-m_TgiAcCPH9x106S3N4voMDjTwIYCPz1tDt7xAfqQ8_auIUZD5h4LLSTJFavwDddmaoomIEPvcTu6QAufj-jw&publicKey=-----BEGIN%20PUBLIC%20KEY-----%0AMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu1SU1LfVLPHCozMxH2Mo%0A4lgOEePzNm0tRgeLezV6ffAt0gunVTLw7onLRnrq0%2FIzW7yWR7QkrmBL7jTKEn5u%0A%2BqKhbwKfBstIs%2BbMY2Zkp18gnTxKLxoS2tFczGkPLPgizskuemMghRniWaoLcyeh%0Akd3qqGElvW%2FVDL5AaWTg0nLVkjRo9z%2B40RQzuVaE8AkAFmxZzow3x%2BVJYKdjykkJ%0A0iT9wCS0DRTXu269V264Vf%2F3jvredZiKRkgwlL9xNAwxXFg0x%2FXFw005UWVRIkdg%0AcKWTjpBP2dPwVZ4WWC%2B9aGVd%2BGyn1o0CLelf4rEjGoXbAAEgAqeGUxrcIlbjXfbc%0AmwIDAQAB%0A-----END%20PUBLIC%20KEY-----");
  }
  catch (err) {
    return res.status(401).json({ status: false, msg: "Invalid token" });
  }

  try {
    user = await User.findById(user.id);
    if (!user) {
      return res.status(401).json({ status: false, msg: "User not found" });
    }

    req.user = user;
    next();
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}