import React, { useState } from 'react';

const DashboardHome = ({ username, onLogout }) => {
  const [activeSection, setActiveSection] = useState('opcion1'); // Estado para la sección activa

  const sections = {
    opcion1: {
      title: 'ChrisBot',
      content: 'Aqui podras entender como funciona ChrisBot y sus mejoras constantes',
      details: 'Enfocados en el desarrollo de nuevas funciones'
    },
    opcion2: {
      title: 'Comandos',
      content: 'Aqui detallaremos el uso de cada comando con su respectivo funcionamiento',
      details: 'Menu actual\n\n.acortar\n.admins\n.antiarabes\n.antilink\n.ban\n.cappg\n.close\n.confgp\n.contreset\n.delete\n.demote\n.dwst\n.espejo\n.espst\n.espvid\n.f12\n.facebook\n.fbmp3\n.hd\n.ia\n.id\n.imagina\n.imagina2\n.img\n.infamg\n.infobot\n.infogroup\n.infouser\n.kick\n.maps\n.menu\n.morse\n.mp3\n.ms\n.offserver\n.open\n.promote\n.qr\n.s\n.server\n.setname\n.setpp\n.spotify\n.svid\n.tiktok\n.todos\n.ttmp3\n.tts\n.wm' 
      
    },
    opcion3: {
      title: 'Contactos',
      content: 'Proximamente detallaremos nuestras redes sociales',
      details: 'Whatsapp, facebook, instagram, tiktok'
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4 text-white">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-4xl transform transition-all duration-500 hover:scale-105 border border-gray-700">
        <h2 className="text-5xl font-extrabold text-center text-white mb-6">¡Qué onda, {username}!</h2>
        <p className="text-xl text-center text-gray-300 mb-10">
          ¡Bienvenido a tu centro de mando ONIX, Actualmente trabajando con ChrisBot!
        </p>

        {/* Menú de opciones */}
        <div className="flex justify-center space-x-4 mb-10 flex-wrap">
          {Object.keys(sections).map((key) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`px-6 py-3 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg
                ${activeSection === key ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              {sections[key].title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Contenido dinámico */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700">
          <h3 className="text-3xl font-bold text-white mb-4">{sections[activeSection].title}</h3>
          <p className="text-gray-300 text-lg mb-4">{sections[activeSection].content}</p>
          <p className="text-gray-400 text-md">{sections[activeSection].details}</p>
        </div>

        <button
          onClick={onLogout}
          className="w-full bg-red-600 text-white py-3 rounded-xl text-xl font-bold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg mt-10"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default DashboardHome;