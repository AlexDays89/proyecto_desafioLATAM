PROYECTO FINAL DESAFIO LATAM - HITO 4
<br>
CLAVE DE USUARIO PARA PRUEBA:
<br>
ROL admin: admin@admin.com
PASS admin: admin123
<br>
ROL user: user@user.com
PASS user: user123
<br>
Pendiente de implementar: FIX de testing.
<br>
https://proyecto-desafio-latam-rfqw.vercel.app/

<br>
ENV de produccion en RENDER
<br>
CORS_ALLOWED_ORIGINS=http://localhost:5173,*.vercel.app
DATABASE_URL=postgresql://postgres.wwbwvesteoihwdtydoog:produccionada@aws-1-sa-east-1.pooler.supabase.com:5432/postgres
JWT_SECRET=jwt_secreto_dev
NODE_ENV=production
NODE_OPTIONS="--dns-result-order=ipv4first"