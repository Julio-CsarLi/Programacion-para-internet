from fastapi import FastAPI
from fastapi.responses import HTMLResponse
import random

# aplicación.
app = FastAPI()

# 6 chistes.
chistes = [
    "¿Qué le dice un semáforo a otro?\n- ¡No me mires, que me estoy cambiando!",
    "¿Por qué los pájaros no usan Facebook?\n- Porque ya tienen Twitter.",
    "¿Cuál es el colmo de un electricista?\n- Que su mujer se llame Luz y sus hijos le sigan la corriente.",
    "Papá, ¿qué se siente tener un hijo tan guapo?\n- No sé hijo, pregúntale a tu abuelo.",
    "¿Qué le dijo un pez a otro?\n-¡Nada!",
    "¿Cómo se llama el hermano vegano de Bruce Lee?\n- Broco Lee."
]

# Endpoint que muestra la pagina
@app.get("/", response_class=HTMLResponse)
def mostrar_pagina_principal():
    
    html_content = """
    <html>
        <head>
            <title>Generador de Chistes</title>
            <style>
                body {
                    font-family: sans-serif;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    text-align: center;
                }
                button {
                    margin-top: 20px;
                    padding: 10px 20px;
                    font-size: 16px;
                    cursor: pointer;
                }
            </style>
        </head>
        <body>
            <h1 id="resultado-dado"></h1>
            <h2 id="chiste-texto">Cargando...</h2>
            <button onclick="nuevoChiste()">Lanzar dado de nuevo</button>

            <script>
                async function nuevoChiste() {
                    document.getElementById('chiste-texto').innerText = 'Buscando un chiste...';
                    const response = await fetch('/api/chiste');
                    const data = await response.json();
                    document.getElementById('resultado-dado').innerText = `Resultado del dado: ${data.numero_del_dado}`;
                    document.getElementById('chiste-texto').innerText = data.chiste_seleccionado;
                }

                // Llamamos a la función
                window.onload = nuevoChiste;
            </script>
        </body>
    </html>
    """
    return HTMLResponse(content=html_content)

@app.get("/api/chiste")
def obtener_chiste_api():
    numero_del_dado = random.randint(1, 6)
    chiste_seleccionado = chistes[numero_del_dado - 1]
    
    return {
        "numero_del_dado": numero_del_dado,
        "chiste_seleccionado": chiste_seleccionado
    }


# http://127.0.0.1:8000