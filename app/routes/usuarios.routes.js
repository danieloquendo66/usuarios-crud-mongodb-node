const { Router } = require("express");
const { check } = require("express-validator");

const {
  esRoleValido,
  existeEmail,
  existeUsuarioPorId,
} = require("../helpers/db-validators");

const { validarCampos } = require("../middlewares/valdar-campos");
const {
  usuariosGet,
  usuariosPos,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require("../controllers/usuarios.controller");

const router = Router();

router.get("/", usuariosGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check(
      "password",
      "El password debe contener al menos 6 digitos o mas"
    ).isLength({ min: 6 }),
    check("correo").custom(existeEmail),

    check("role").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPos
);
router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("role").custom(esRoleValido),
    validarCampos,
  ],

  usuariosPut
);
router.patch("/", usuariosPatch);

router.delete(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
