const { encrypt, decrypt } = require('../lib/security/encryption.ts');
const { validatePassword, hashPassword, verifyPassword } = require('../lib/security/auth.ts');
const { RegisterSchema, sanitizeName } = require('../lib/security/validation-schemas.ts');

async function testSecurity() {
  console.log('--- 🧪 Test de Seguridad: LaunchLab Pro ---\n');

  // 1. Test de Cifrado (AES-256-GCM)
  console.log('1. Probando Cifrado de Datos Sensibles...');
  const sensitiveData = 'Clave_Secreta_De_API_123';
  const encrypted = encrypt(sensitiveData);
  const decrypted = decrypt(encrypted);
  console.log(`   Texto original: ${sensitiveData}`);
  console.log(`   Cifrado: ${encrypted.substring(0, 30)}...`);
  console.log(`   Descifrado: ${decrypted}`);
  console.log(decrypted === sensitiveData ? '   ✅ ÉXITO: Cifrado íntegro' : '   ❌ ERROR: Fallo en descifrado');
  console.log('');

  // 2. Test de Contraseñas
  console.log('2. Probando Seguridad de Contraseñas...');
  const weakPassword = '123';
  const strongPassword = 'ComplexPass!2024';
  const validationWeak = validatePassword(weakPassword);
  const validationStrong = validatePassword(strongPassword);

  console.log(`   Validando "${weakPassword}": ${validationWeak.valid ? '✅' : '❌'} (${validationWeak.errors[0]})`);
  console.log(`   Validando "${strongPassword}": ${validationStrong.valid ? '✅' : '❌'}`);

  console.log('   Hashing y Verificación...');
  const hash = await hashPassword(strongPassword);
  const isValidMatch = await verifyPassword(strongPassword, hash);
  console.log(`   Hash generado: ${hash.substring(0, 20)}...`);
  console.log(`   ¿Coincide la clave?: ${isValidMatch ? '✅ SÍ' : '❌ NO'}`);
  console.log('');

  // 3. Test de Validación y Sanitización
  console.log('3. Probando Sanitización de Inputs...');
  const dirtyName = '   John <script>alert("xss")</script>  Doe   ';
  const cleanName = sanitizeName(dirtyName);
  console.log(`   Nombre sucio: "${dirtyName}"`);
  console.log(`   Nombre limpio: "${cleanName}"`);
  console.log(cleanName.includes('<script>') ? '   ❌ ERROR: XSS no filtrado' : '   ✅ ÉXITO: XSS neutralizado');

  console.log('\n--- ✨ Pruebas completadas con éxito ---');
}

// Configurar variables de entorno ficticias para el test si no existen
process.env.ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';

testSecurity().catch(console.error);
