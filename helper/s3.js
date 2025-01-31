const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

const uploadFile = async (props) => {
  const { directory, file } = props;

  const extension = file.originalname.split(".").pop();
  const filename = `${uuidv4()}.${extension}`;

  const bufferedFile = await file.buffer;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `group/${directory}/${filename}`,
    Body: Buffer.from(bufferedFile),
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  return `${process.env.AWS_URL}/group/${directory}/${filename}`;
};

module.exports = { uploadFile };
