import { TextField } from "./TextField";

export function NameFields() {
  const nameRules = [
    { required: true, message: 'Ingresa tu nombre' },
    { min: 2, message: 'El nombre debe tener al menos 2 caracteres' },
    { pattern: /^[a-zA-ZÀ-ÿ\s]+$/, message: 'El nombre solo puede contener letras' },
  ];

  const lastNameRules = [
    { required: true, message: 'Ingresa tu apellido' },
    { min: 2, message: 'El apellido debe tener al menos 2 caracteres' },
    { pattern: /^[a-zA-ZÀ-ÿ\s]+$/, message: 'El apellido solo puede contener letras' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
      <TextField
        name="nombre"
        label="Nombre"
        placeholder="Digita tu nombre"
        rules={nameRules}
      />
      <TextField
        name="apellido"
        label="Apellido"
        placeholder="Digita tu apellido"
        rules={lastNameRules}
      />
    </div>
  );
}