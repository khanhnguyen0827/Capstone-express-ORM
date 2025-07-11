import authSwagger from "./auth.swagger";
import userSwagger from "./user.swagger";
import imageSwagger from "./image.swagger";

const swaggerDocument = {
   openapi: "3.1.1",
   info: {
      title: "Cyber Community API",
      version: "1.0.0",
   },
   servers: [
      {
         url: "http://localhost:3069",
         description: "Local Server",
      },
      {
         url: "http://domaincuatoi:3069",
         description: "Product Server",
      },
   ],
   components: {
      securitySchemes: {
         ANH_LONG_BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
         },
      },
   },
   paths: {
      ...authSwagger,
      ...userSwagger,
      ...imageSwagger,
   },
};

export default swaggerDocument;
