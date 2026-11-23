/* eslint-disable */
// Site behaviour ported as-is from the original single-file prototype (i18n, maps, carousel, form, motion).
// It runs once in the browser after React has rendered the static markup (see components/AvioraClient.js).
import { IMG } from './images';

export function initAviora(gsap, ScrollTrigger, Lenis) {

/* ---------- Integration points (set before launch) ---------- */
var WA_NUMBER = '';      // digits only, e.g. 502XXXXXXXX. Empty: WhatsApp opens with the message pre-filled and lets the visitor choose the contact.
var CALENDLY_URL = '';   // e.g. https://calendly.com/aviora/discovery-call
var HERO_VIDEO = '';     // optional .mp4 URL for the full-screen hero video (poster = hero image)
/* In production this posts to a Next.js route that creates the CRM contact and sends the confirmation email. */
var LANG_NAMES_ES = {en:'Inglés',es:'Español',fr:'Francés',de:'Alemán',it:'Italiano',zh:'Chino (simplificado)'};
function tEs(k){ var a = T[k]; return a ? a[1] : k; }
function destEs(id){ if(!id) return 'No indicado'; if(id === 'open') return tEs('f.open'); if(['ant','atit','pet','pac'].indexOf(id) >= 0) return tEs('d.' + id + '.n'); return tEs('w.' + id + '.n'); }
/* Whatever language the traveler uses, the team always receives the inquiry in Spanish. Free-text comments stay as the traveler wrote them. */
function toSpanish(r){
  var tipos = r.experiences.map(function(id){ return tEs(id + '.n'); });
  var presupuesto = r.budget !== '' ? r.budget : 'No indicado';
  var o = {
    tipo: 'Solicitud de viaje',
    idioma_del_viajero: LANG_NAMES_ES[r.lang] || r.lang,
    nombre: r.name,
    correo: r.email,
    pais_de_residencia: r.country,
    telefono: r.phone || 'No indicado',
    destino_preferido: destEs(r.destination),
    fechas_aproximadas: r.dates || 'No indicadas',
    numero_de_viajeros: r.travelers,
    presupuesto_total_usd: presupuesto,
    tipos_de_experiencia: tipos,
    comentarios_en_idioma_del_viajero: r.message || 'Sin comentarios',
    consentimiento_de_privacidad: 'Sí',
    origen: 'Sitio web',
    fecha_de_envio: r.ts
  };
  o.resumen = ['SOLICITUD DE VIAJE · AVIORA', 'Idioma del viajero: ' + o.idioma_del_viajero, 'Nombre: ' + o.nombre, 'Correo: ' + o.correo, 'País de residencia: ' + o.pais_de_residencia, 'Teléfono: ' + o.telefono, 'Destino preferido: ' + o.destino_preferido, 'Fechas aproximadas: ' + o.fechas_aproximadas, 'Número de viajeros: ' + o.numero_de_viajeros, 'Presupuesto total estimado (USD): ' + o.presupuesto_total_usd, 'Tipo de experiencia: ' + (tipos.length ? tipos.join(', ') : 'No indicado'), 'Comentarios (en el idioma del viajero): ' + o.comentarios_en_idioma_del_viajero, 'Consentimiento de privacidad: Sí', 'Fecha de envío: ' + o.fecha_de_envio].join('\n');
  return o;
}
function callbackEs(phone, time){
  var h = {am:'Mañana', pm:'Tarde', eve:'Noche'};
  var o = { tipo: 'Solicitud de llamada', idioma_del_viajero: LANG_NAMES_ES[lang] || lang, telefono: phone, horario_preferido: h[time] || time, origen: 'Sitio web', fecha_de_envio: new Date().toISOString() };
  o.resumen = ['SOLICITUD DE LLAMADA · AVIORA', 'Idioma del viajero: ' + o.idioma_del_viajero, 'Teléfono: ' + o.telefono, 'Horario preferido: ' + o.horario_preferido, 'Fecha de envío: ' + o.fecha_de_envio].join('\n');
  return o;
}
function submitInquiry(payload){ console.info('AVIORA inquiry (prototype, nothing is sent):\n' + payload.resumen, payload); return new Promise(function(r){ setTimeout(r, 900); }); }


/* ---------- Content (EN / ES / FR / DE) ---------- */
var T = {
'skip':['Skip to content','Saltar al contenido','Aller au contenu','Zum Inhalt springen'],
'aria.nav':['Main navigation','Navegación principal','Navigation principale','Hauptnavigation'],
'aria.less':['Fewer travelers','Menos viajeros','Moins de voyageurs','Weniger Reisende'],
'aria.more':['More travelers','Más viajeros','Plus de voyageurs','Mehr Reisende'],
'nav.dest':['Destinations','Destinos','Destinations','Reiseziele'],
'nav.exp':['Experiences','Experiencias','Expériences','Erlebnisse'],
'nav.expFull':['Signature Experiences','Experiencias exclusivas','Expériences signature','Signature-Erlebnisse'],
'nav.bespoke':['Bespoke Journeys','Viajes a medida','Voyages sur mesure','Maßgeschneiderte Reisen'],
'nav.cel':['Celebrations','Celebraciones','Célébrations','Feiern'],
'nav.celFull':['Celebrations & Escapes','Celebraciones y escapadas','Célébrations & escapades','Feiern & Auszeiten'],
'nav.story':['Our Story','Nuestra historia','Notre histoire','Unsere Geschichte'],
'nav.plan':['Plan Your Journey','Diseña tu viaje','Planifiez votre voyage','Reise planen'],
'nav.menu':['Menu','Menú','Menu','Menü'],
'nav.close':['Close','Cerrar','Fermer','Schließen'],
'nav.top':['Back to top','Volver al inicio','Retour en haut','Zurück nach oben'],
'lang.label':['Language','Idioma','Langue','Sprache'],
'hero.title':['The Art of Extraordinary Travel','El arte de viajar de manera extraordinaria','L’art du voyage extraordinaire','Die Kunst des außergewöhnlichen Reisens'],
'hero.sub':['Exceptional destinations. Meaningful experiences. Journeys beautifully designed around you.','Destinos excepcionales. Experiencias memorables. Viajes diseñados especialmente para ti.','Des destinations d’exception. Des expériences qui comptent. Des voyages conçus avec soin autour de vous.','Außergewöhnliche Reiseziele. Bedeutungsvolle Erlebnisse. Reisen, die ganz um Sie herum gestaltet werden.'],
'hero.cta1':['Plan your journey','Diseña tu viaje','Planifiez votre voyage','Reise planen'],
'hero.cta2':['Explore destinations','Explorar destinos','Découvrir les destinations','Reiseziele entdecken'],
'hero.scroll':['Scroll','Desliza','Défiler','Scrollen'],
'man.title':['Beyond travel. Into extraordinary experiences.','Más allá de viajar. Hacia experiencias extraordinarias.','Au-delà du voyage. Vers des expériences extraordinaires.','Mehr als Reisen. Hinein in außergewöhnliche Erlebnisse.'],
'man.text':['We believe true luxury lies in the details, in the freedom to explore at your own pace, and in the privilege of experiencing the world in a deeply personal way.','Creemos que el verdadero lujo está en los detalles, en la libertad de descubrir a tu ritmo y en el privilegio de experimentar el mundo de una manera profundamente personal.','Nous croyons que le véritable luxe réside dans les détails, dans la liberté d’explorer à son rythme et dans le privilège de vivre le monde de manière profondément personnelle.','Wir glauben, dass wahrer Luxus in den Details liegt, in der Freiheit, im eigenen Tempo zu entdecken, und im Privileg, die Welt auf zutiefst persönliche Weise zu erleben.'],
'intro.text':['Discover a world where travel becomes an art. At AVIORA, we curate exceptional journeys, extraordinary stays, and unforgettable experiences for travelers who seek something beyond the ordinary. Rooted in Guatemala and inspired by the world, every journey is thoughtfully designed to reflect your passions, desires, and sense of discovery.','Descubre un mundo donde viajar se convierte en un arte. En AVIORA creamos viajes excepcionales, seleccionamos alojamientos extraordinarios y diseñamos experiencias inolvidables para quienes buscan mucho más que un destino. Con raíces en Guatemala y una visión hacia el mundo, cada viaje refleja tus pasiones, deseos y espíritu de descubrimiento.','Découvrez un monde où voyager devient un art. Chez AVIORA, nous composons des voyages d’exception, des séjours extraordinaires et des expériences inoubliables pour les voyageurs en quête de bien plus que l’ordinaire. Enracinés au Guatemala et inspirés par le monde, chacun de nos voyages est pensé pour refléter vos passions, vos envies et votre esprit de découverte.','Entdecken Sie eine Welt, in der Reisen zur Kunst wird. Bei AVIORA kuratieren wir außergewöhnliche Reisen, besondere Unterkünfte und unvergessliche Erlebnisse für Reisende, die mehr als das Gewöhnliche suchen. Mit Wurzeln in Guatemala und inspiriert von der Welt ist jede Reise sorgfältig darauf ausgelegt, Ihre Leidenschaften, Wünsche und Ihren Entdeckergeist widerzuspiegeln.'],
'c.regions':['Signature regions in Guatemala','Regiones insignia en Guatemala','Régions signature au Guatemala','Signature-Regionen in Guatemala'],
'c.collections':['Collections of signature experiences','Colecciones de experiencias exclusivas','Collections d’expériences signature','Kollektionen von Signature-Erlebnissen'],
'c.worlds':['World regions beyond Guatemala','Regiones del mundo más allá de Guatemala','Régions du monde au-delà du Guatemala','Weltregionen jenseits von Guatemala'],
'c.langs':['Languages, one conversation','Idiomas, una sola conversación','Langues, une seule conversation','Sprachen, ein Gespräch'],
'phil.title':['Beautifully curated. Entirely yours.','Cuidadosamente diseñado. Exclusivamente para ti.','Magnifiquement composé. Entièrement vôtre.','Wunderschön kuratiert. Ganz für Sie.'],
'phil.text':['Every destination has a story. Every traveler has a vision. We bring them together through exceptional hospitality, authentic experiences, and thoughtful attention to detail.','Cada destino tiene una historia. Cada viajero, una visión. Unimos ambos mundos a través de hospitalidad excepcional, experiencias auténticas y atención a cada detalle.','Chaque destination a une histoire. Chaque voyageur, une vision. Nous les réunissons grâce à une hospitalité exceptionnelle, des expériences authentiques et une attention portée à chaque détail.','Jedes Reiseziel hat eine Geschichte. Jeder Reisende hat eine Vision. Wir führen beides zusammen – durch außergewöhnliche Gastfreundschaft, authentische Erlebnisse und Liebe zum Detail.'],
'cta.design':['Design your journey','Diseña tu viaje','Concevez votre voyage','Gestalten Sie Ihre Reise'],
'gt.title':['Extraordinary places. Endless possibilities.','Lugares extraordinarios. Posibilidades infinitas.','Des lieux extraordinaires. Des possibilités infinies.','Außergewöhnliche Orte. Unendliche Möglichkeiten.'],
'gt.text':['Four regions of Guatemala, each with its own rhythm. Hover over the map or choose a place to see what awaits.','Cuatro regiones de Guatemala, cada una con su propio ritmo. Pasa el cursor sobre el mapa o elige un lugar para ver qué te espera.','Quatre régions du Guatemala, chacune avec son propre rythme. Survolez la carte ou choisissez un lieu pour voir ce qui vous attend.','Vier Regionen Guatemalas, jede mit ihrem eigenen Rhythmus. Fahren Sie über die Karte oder wählen Sie einen Ort, um zu sehen, was Sie erwartet.'],
'gt.pick':['Choose a place','Elige un lugar','Choisissez un lieu','Ort wählen'],
'gt.map':['Stylized map of Guatemala','Mapa estilizado de Guatemala','Carte stylisée du Guatemala','Stilisierte Karte von Guatemala'],
'gt.inc':['Can include','Puede incluir','Peut inclure','Kann beinhalten'],
'gt.cta':['Design a journey here','Diseña un viaje aquí','Concevez un voyage ici','Reise hierher gestalten'],
'd.ant.n':['Antigua Guatemala','Antigua Guatemala','Antigua Guatemala','Antigua Guatemala'],
'd.ant.t':['Timeless elegance','Elegancia atemporal','Élégance intemporelle','Zeitlose Eleganz'],
'd.ant.x':['Wander through cobblestone streets, discover remarkable architecture, and immerse yourself in a destination where history, culture, and contemporary luxury meet.','Recorre calles empedradas, descubre una arquitectura extraordinaria y sumérgete en un destino donde la historia, la cultura y el lujo contemporáneo se encuentran.','Parcourez des rues pavées, découvrez une architecture remarquable et plongez dans une destination où l’histoire, la culture et le luxe contemporain se rencontrent.','Schlendern Sie durch Kopfsteinpflastergassen, entdecken Sie bemerkenswerte Architektur und tauchen Sie in ein Reiseziel ein, in dem Geschichte, Kultur und zeitgenössischer Luxus aufeinandertreffen.'],
'd.ant.e1':['Private dinners in historic courtyards','Cenas privadas en patios históricos','Dîners privés dans des patios historiques','Private Dinner in historischen Innenhöfen'],
'd.ant.e2':['Architecture and heritage walks','Recorridos de arquitectura y patrimonio','Promenades architecture et patrimoine','Rundgänge zu Architektur und Kulturerbe'],
'd.ant.e3':['Rooftop evenings facing the volcanoes','Atardeceres en terrazas frente a los volcanes','Soirées en terrasse face aux volcans','Abende auf Dachterrassen mit Vulkanblick'],
'd.atit.n':['Lake Atitlán','Lago de Atitlán','Lac Atitlán','Atitlán-See'],
'd.atit.t':['Where nature inspires','Donde la naturaleza inspira','Là où la nature inspire','Wo die Natur inspiriert'],
'd.atit.x':['Surrounded by majestic volcanoes and picturesque villages, Lake Atitlán offers secluded lakeside retreats, private boat journeys, wellness experiences, and authentic cultural encounters.','Rodeado de majestuosos volcanes y pintorescos pueblos, Atitlán ofrece refugios exclusivos, recorridos privados en lancha, bienestar y encuentros culturales auténticos.','Entouré de volcans majestueux et de villages pittoresques, le lac Atitlán offre des retraites isolées en bord de lac, des traversées privées en bateau, des expériences de bien-être et d’authentiques rencontres culturelles.','Umgeben von majestätischen Vulkanen und malerischen Dörfern bietet der Atitlán-See abgeschiedene Rückzugsorte am Ufer, private Bootsfahrten, Wellness-Erlebnisse und authentische Begegnungen mit der Kultur.'],
'd.atit.e1':['Private boat journeys between villages','Recorridos privados en lancha entre pueblos','Traversées privées en bateau entre les villages','Private Bootsfahrten zwischen den Dörfern'],
'd.atit.e2':['Lakeside wellness rituals','Rituales de bienestar junto al lago','Rituels de bien-être au bord du lac','Wellness-Rituale am Seeufer'],
'd.atit.e3':['Time with Maya weavers','Encuentros con tejedoras mayas','Rencontres avec des tisserandes mayas','Begegnungen mit Maya-Weberinnen'],
'd.pet.n':['Petén & Tikal','Petén y Tikal','Petén et Tikal','Petén & Tikal'],
'd.pet.t':['Ancient wonders','Maravillas ancestrales','Merveilles anciennes','Antike Wunder'],
'd.pet.x':['Journey into the heart of the Maya world, where archaeological treasures rise above lush tropical forests. Discover ancient history through privately guided experiences.','Viaja al corazón del mundo maya, donde tesoros arqueológicos emergen entre bosques tropicales. Descubre la historia ancestral mediante experiencias guiadas privadas.','Voyagez au cœur du monde maya, où des trésors archéologiques s’élèvent au-dessus de forêts tropicales luxuriantes. Découvrez l’histoire ancienne lors d’expériences guidées en privé.','Reisen Sie ins Herz der Maya-Welt, wo archäologische Schätze über üppigem tropischem Wald aufragen. Entdecken Sie uralte Geschichte bei privat geführten Erlebnissen.'],
'd.pet.e1':['Privately guided visit to Tikal','Visita privada guiada a Tikal','Visite guidée privée de Tikal','Privat geführter Besuch in Tikal'],
'd.pet.e2':['Sunrise above the jungle canopy','Amanecer sobre el dosel de la selva','Lever du soleil au-dessus de la canopée','Sonnenaufgang über dem Dschungeldach'],
'd.pet.e3':['Scenic flights over the region','Vuelos panorámicos sobre la región','Vols panoramiques au-dessus de la région','Panoramaflüge über die Region'],
'd.pac.n':['Pacific Coast','Costa del Pacífico','Côte pacifique','Pazifikküste'],
'd.pac.t':['Coastal retreats','Refugios junto al mar','Retraites en bord de mer','Rückzugsorte am Meer'],
'd.pac.x':['Discover Guatemala’s Pacific coastline, where volcanic sands, ocean landscapes, and peaceful coastal retreats invite you to unwind.','Descubre la costa del Pacífico guatemalteco, donde las arenas volcánicas, el océano y los refugios junto al mar invitan a desconectarse.','Découvrez le littoral pacifique du Guatemala, où sables volcaniques, paysages océaniques et retraites paisibles en bord de mer invitent à la détente.','Entdecken Sie Guatemalas Pazifikküste, wo vulkanischer Sand, Meereslandschaften und friedliche Rückzugsorte am Meer zum Entspannen einladen.'],
'd.pac.e1':['Beachfront retreats on volcanic sand','Refugios frente al mar en arena volcánica','Retraites face à la mer sur sable volcanique','Rückzugsorte am Strand aus vulkanischem Sand'],
'd.pac.e2':['Sunsets over the ocean','Atardeceres sobre el océano','Couchers de soleil sur l’océan','Sonnenuntergänge über dem Ozean'],
'd.pac.e3':['Seaside wellness and rest','Bienestar y descanso junto al mar','Bien-être et repos en bord de mer','Wellness und Erholung am Meer'],
'w.title':['Beyond Guatemala. The world awaits.','Más allá de Guatemala. El mundo te espera.','Au-delà du Guatemala. Le monde vous attend.','Jenseits von Guatemala. Die Welt wartet.'],
'w.text':['From romantic Europe to African safaris, Asian cultural treasures, and island escapes, AVIORA designs international journeys around your travel dreams.','Desde la Europa romántica hasta safaris africanos, tesoros culturales asiáticos y escapadas insulares, AVIORA diseña viajes internacionales alrededor de tus sueños.','De l’Europe romantique aux safaris africains, des trésors culturels asiatiques aux escapades insulaires, AVIORA conçoit des voyages internationaux autour de vos rêves.','Vom romantischen Europa über afrikanische Safaris und asiatische Kulturschätze bis zu Inselauszeiten: AVIORA gestaltet internationale Reisen rund um Ihre Reiseträume.'],
'w.map':['Interactive world map','Mapa mundial interactivo','Carte du monde interactive','Interaktive Weltkarte'],
'w.filter':['Filter by region','Filtrar por región','Filtrer par région','Nach Region filtern'],
'w.all':['All','Todos','Tous','Alle'],
'w.eu':['Europe','Europa','Europe','Europa'],
'w.as':['Asia','Asia','Asie','Asien'],
'w.af':['Africa','África','Afrique','Afrika'],
'w.me':['Middle East','Medio Oriente','Moyen-Orient','Naher Osten'],
'w.is':['Exclusive islands','Islas exclusivas','Îles exclusives','Exklusive Inseln'],
'w.req':['Available upon request','Disponible bajo solicitud','Disponible sur demande','Auf Anfrage verfügbar'],
'w.gt.n':['Guatemala','Guatemala','Guatemala','Guatemala'],
'w.gt.x':['Where every AVIORA journey begins.','Donde comienza cada viaje AVIORA.','Là où commence chaque voyage AVIORA.','Hier beginnt jede AVIORA-Reise.'],
'w.gt.cta':['Explore Guatemala','Explorar Guatemala','Découvrir le Guatemala','Guatemala entdecken'],
'w.it.n':['Italy','Italia','Italie','Italien'],
'w.it.x':['Coastal villages, historic cities and long lunches by the sea.','Pueblos costeros, ciudades históricas y almuerzos largos frente al mar.','Villages côtiers, villes historiques et longs déjeuners face à la mer.','Küstendörfer, historische Städte und lange Mittagessen am Meer.'],
'w.jp.n':['Japan','Japón','Japon','Japan'],
'w.jp.x':['Quiet temples, refined cuisine and traditions that reward slow travel.','Templos silenciosos, cocina refinada y tradiciones que premian el viaje pausado.','Temples paisibles, cuisine raffinée et traditions qui récompensent le voyage lent.','Stille Tempel, verfeinerte Küche und Traditionen, die langsames Reisen belohnen.'],
'w.ea.n':['East Africa','África Oriental','Afrique de l’Est','Ostafrika'],
'w.ea.x':['Private safaris and wide horizons, guided with deep local knowledge.','Safaris privados y horizontes infinitos, guiados con profundo conocimiento local.','Safaris privés et horizons infinis, guidés avec une profonde connaissance du terrain.','Private Safaris und weite Horizonte, begleitet von tiefem lokalem Wissen.'],
'w.jo.n':['Jordan','Jordania','Jordanie','Jordanien'],
'w.jo.x':['Ancient stone cities and desert nights beneath a sky full of stars.','Antiguas ciudades de piedra y noches de desierto bajo un cielo lleno de estrellas.','Anciennes cités de pierre et nuits dans le désert sous un ciel étoilé.','Antike Felsenstädte und Wüstennächte unter einem Sternenhimmel.'],
'w.mv.n':['Maldives','Maldivas','Maldives','Malediven'],
'w.mv.x':['Private islands, clear water and complete stillness.','Islas privadas, aguas cristalinas y calma absoluta.','Îles privées, eaux cristallines et calme absolu.','Private Inseln, klares Wasser und vollkommene Stille.'],
'x.title':['Moments beyond the ordinary.','Momentos fuera de lo ordinario.','Des moments hors du commun.','Momente jenseits des Gewöhnlichen.'],
'x.text':['Our signature experiences celebrate discovery, authenticity, exceptional hospitality, and meaningful moments.','Nuestras experiencias exclusivas celebran el descubrimiento, la autenticidad, la hospitalidad excepcional y los momentos que dejan huella.','Nos expériences signature célèbrent la découverte, l’authenticité, l’hospitalité d’exception et les moments qui marquent.','Unsere Signature-Erlebnisse feiern Entdeckung, Authentizität, außergewöhnliche Gastfreundschaft und bedeutungsvolle Momente.'],
'x.drag':['Drag','Arrastra','Glisser','Ziehen'],
'x.open':['Open','Abrir','Ouvrir','Öffnen'],
'x.prev':['Previous','Anterior','Précédent','Zurück'],
'x.next':['Next','Siguiente','Suivant','Weiter'],
'x.cta':['Design this experience','Diseña esta experiencia','Concevez cette expérience','Dieses Erlebnis gestalten'],
'x1.n':['Private Dining & Culinary Journeys','Cenas privadas y viajes culinarios','Dîners privés et voyages culinaires','Private Dinner & kulinarische Reisen'],
'x1.s':['Discover a destination through its flavors.','Descubre cada destino a través de sus sabores.','Découvrez une destination par ses saveurs.','Entdecken Sie ein Reiseziel durch seine Aromen.'],
'x1.l':['Discover a destination through its flavors: private dinners, chef-led encounters, curated tastings, and exceptional culinary settings.','Descubre cada destino a través de sus sabores: cenas privadas, encuentros con chefs, degustaciones seleccionadas y escenarios gastronómicos excepcionales.','Découvrez une destination à travers ses saveurs : dîners privés, rencontres avec des chefs, dégustations sélectionnées et cadres gastronomiques d’exception.','Entdecken Sie ein Reiseziel durch seine Aromen: private Dinner, Begegnungen mit Köchen, ausgewählte Verkostungen und außergewöhnliche kulinarische Schauplätze.'],
'x1.i1':['Private dinner with a chef','Cena privada con chef','Dîner privé avec un chef','Privates Dinner mit Koch'],
'x1.i2':['Curated tastings','Degustaciones seleccionadas','Dégustations sélectionnées','Ausgewählte Verkostungen'],
'x1.i3':['Dining in singular settings','Mesas en escenarios únicos','Tables dans des lieux singuliers','Essen an besonderen Orten'],
'x2.n':['Wellness & Restorative Escapes','Bienestar y escapadas restauradoras','Bien-être et escapades ressourçantes','Wellness & erholsame Auszeiten'],
'x2.s':['Reconnect through stillness.','Reconecta a través de la calma.','Reconnectez-vous par le calme.','Finden Sie durch Stille zu sich zurück.'],
'x2.l':['Reconnect through tranquil retreats, personalized wellness experiences, and exceptional spas.','Reconecta a través de refugios tranquilos, experiencias personalizadas de bienestar y spas excepcionales.','Reconnectez-vous grâce à des retraites paisibles, des expériences de bien-être personnalisées et des spas d’exception.','Finden Sie zu sich zurück – in ruhigen Rückzugsorten, mit persönlich gestalteten Wellness-Erlebnissen und außergewöhnlichen Spas.'],
'x2.i1':['Private spa rituals','Rituales de spa privados','Rituels de spa privés','Private Spa-Rituale'],
'x2.i2':['Mindful movement at sunrise','Movimiento consciente al amanecer','Mouvement en pleine conscience au lever du jour','Achtsame Bewegung bei Sonnenaufgang'],
'x2.i3':['Quiet retreats in nature','Refugios tranquilos en la naturaleza','Retraites paisibles en pleine nature','Ruhige Rückzugsorte in der Natur'],
'x3.n':['Romance & Celebrations','Romance y celebraciones','Romance et célébrations','Romantik & Feiern'],
'x3.s':['Intimate moments, thoughtfully designed.','Momentos íntimos, cuidadosamente diseñados.','Des moments intimes, pensés avec soin.','Intime Momente, sorgfältig gestaltet.'],
'x3.l':['Celebrate honeymoons, anniversaries, and meaningful milestones with intimate, thoughtfully designed experiences.','Celebra lunas de miel, aniversarios y ocasiones especiales con experiencias íntimas cuidadosamente diseñadas.','Célébrez lunes de miel, anniversaires et étapes marquantes avec des expériences intimes, pensées avec soin.','Feiern Sie Flitterwochen, Jahrestage und besondere Meilensteine mit intimen, sorgfältig gestalteten Erlebnissen.'],
'x3.i1':['Candlelit dinners for two','Cenas a la luz de las velas para dos','Dîners aux chandelles pour deux','Dinner bei Kerzenschein zu zweit'],
'x3.i2':['Surprises arranged in advance','Sorpresas organizadas con antelación','Surprises préparées à l’avance','Im Voraus arrangierte Überraschungen'],
'x3.i3':['Private spaces for the occasion','Espacios privados para la ocasión','Lieux privés pour l’occasion','Private Räume für den Anlass'],
'x4.n':['Exceptional Stays','Alojamientos excepcionales','Séjours d’exception','Außergewöhnliche Unterkünfte'],
'x4.s':['Hotels and villas chosen for character.','Hoteles y villas elegidos por su carácter.','Hôtels et villas choisis pour leur caractère.','Hotels und Villen mit Charakter.'],
'x4.l':['Discover boutique hotels, exceptional resorts, private villas, and remarkable hideaways selected for character and hospitality.','Descubre hoteles boutique, resorts excepcionales, villas privadas y refugios seleccionados por su personalidad y hospitalidad.','Découvrez des hôtels de charme, des resorts d’exception, des villas privées et des refuges remarquables, choisis pour leur caractère et leur hospitalité.','Entdecken Sie Boutique-Hotels, außergewöhnliche Resorts, private Villen und besondere Rückzugsorte, ausgewählt für Charakter und Gastfreundschaft.'],
'x4.i1':['Boutique hotels','Hoteles boutique','Hôtels de charme','Boutique-Hotels'],
'x4.i2':['Private villas','Villas privadas','Villas privées','Private Villen'],
'x4.i3':['Remarkable hideaways','Refugios extraordinarios','Refuges remarquables','Besondere Rückzugsorte'],
'x5.n':['Private Adventures','Aventuras privadas','Aventures privées','Private Abenteuer'],
'x5.s':['Landscapes seen from the air, water and trail.','Paisajes vistos desde el aire, el agua y el sendero.','Des paysages vus du ciel, de l’eau et des sentiers.','Landschaften aus der Luft, vom Wasser und zu Fuß.'],
'x5.l':['Explore extraordinary landscapes through scenic flights, private nature excursions, and remarkable outdoor adventures.','Explora paisajes extraordinarios mediante vuelos panorámicos, excursiones privadas y aventuras memorables al aire libre.','Explorez des paysages extraordinaires lors de vols panoramiques, d’excursions privées dans la nature et d’aventures remarquables en plein air.','Erkunden Sie außergewöhnliche Landschaften auf Panoramaflügen, privaten Naturausflügen und besonderen Outdoor-Abenteuern.'],
'x5.i1':['Scenic flights','Vuelos panorámicos','Vols panoramiques','Panoramaflüge'],
'x5.i2':['Private nature excursions','Excursiones privadas en la naturaleza','Excursions privées dans la nature','Private Naturausflüge'],
'x5.i3':['Lake and volcano journeys','Travesías por lago y volcán','Traversées de lacs et de volcans','Touren zu See und Vulkan'],
'x6.n':['Culture & Heritage','Cultura y patrimonio','Culture et patrimoine','Kultur & Erbe'],
'x6.s':['Meet the people who keep traditions alive.','Conoce a quienes mantienen vivas las tradiciones.','Rencontrez ceux qui font vivre les traditions.','Begegnen Sie den Menschen, die Traditionen lebendig halten.'],
'x6.l':['Connect with local traditions through private discoveries, traditional craftsmanship, and meaningful cultural encounters.','Conecta con tradiciones locales mediante recorridos privados, artesanía tradicional y encuentros culturales significativos.','Entrez en contact avec les traditions locales grâce à des découvertes privées, à l’artisanat traditionnel et à des rencontres culturelles porteuses de sens.','Verbinden Sie sich mit lokalen Traditionen – durch private Entdeckungen, traditionelles Handwerk und bedeutungsvolle kulturelle Begegnungen.'],
'x6.i1':['Workshops with master artisans','Talleres con maestros artesanos','Ateliers avec des maîtres artisans','Workshops mit Handwerksmeistern'],
'x6.i2':['Private heritage tours','Recorridos privados de patrimonio','Visites privées du patrimoine','Private Kulturerbe-Touren'],
'x6.i3':['Conversations with local guides','Conversaciones con guías locales','Échanges avec des guides locaux','Gespräche mit lokalen Guides'],
'x7.n':['Family & Multigenerational Journeys','Viajes familiares y multigeneracionales','Voyages en famille et entre générations','Familien- & Mehrgenerationenreisen'],
'x7.s':['Memories shared across generations.','Recuerdos compartidos entre generaciones.','Des souvenirs partagés entre générations.','Erinnerungen über Generationen hinweg.'],
'x7.l':['Create memories across generations through private adventures, cultural discovery, and exceptional stays.','Crea recuerdos entre generaciones con aventuras privadas, descubrimientos culturales y alojamientos excepcionales.','Créez des souvenirs entre générations grâce à des aventures privées, des découvertes culturelles et des séjours d’exception.','Schaffen Sie Erinnerungen über Generationen hinweg – mit privaten Abenteuern, kulturellen Entdeckungen und außergewöhnlichen Unterkünften.'],
'x7.i1':['Itineraries paced for every age','Itinerarios con ritmo para cada edad','Itinéraires adaptés à chaque âge','Reiserouten im Tempo jeder Altersgruppe'],
'x7.i2':['Shared private experiences','Experiencias privadas compartidas','Expériences privées partagées','Gemeinsame private Erlebnisse'],
'x7.i3':['Spacious stays for the whole family','Alojamientos amplios para toda la familia','Séjours spacieux pour toute la famille','Großzügige Unterkünfte für die ganze Familie'],
'b.title':['Your world. Your way.','Tu mundo. A tu manera.','Votre monde. À votre façon.','Ihre Welt. Auf Ihre Art.'],
'b.text':['No two travelers are alike. Neither should their journeys be. AVIORA creates personalized itineraries with exceptional stays, private experiences, transportation, and thoughtful details.','No existen dos viajeros iguales. Sus viajes tampoco deberían serlo. AVIORA crea itinerarios personalizados con alojamientos excepcionales, experiencias privadas, transporte y detalles cuidadosamente elegidos.','Il n’existe pas deux voyageurs identiques. Leurs voyages ne devraient pas l’être non plus. AVIORA crée des itinéraires personnalisés avec des séjours d’exception, des expériences privées, des transports et des attentions soignées.','Keine zwei Reisenden gleichen sich. Ihre Reisen sollten es auch nicht tun. AVIORA gestaltet persönliche Reiserouten mit außergewöhnlichen Unterkünften, privaten Erlebnissen, Transport und liebevoll gewählten Details.'],
's1.t':['Discover','Descubrir','Découvrir','Entdecken'],
's1.d':['We listen to your aspirations, preferences, and travel wishes.','Escuchamos tus aspiraciones, preferencias y deseos de viaje.','Nous écoutons vos aspirations, vos préférences et vos envies de voyage.','Wir hören Ihnen zu: Ihren Wünschen, Vorlieben und Reiseträumen.'],
's2.t':['Design','Diseñar','Concevoir','Gestalten'],
's2.d':['We create a personalized itinerary reflecting your vision.','Creamos un itinerario personalizado que refleja tu visión.','Nous créons un itinéraire personnalisé qui reflète votre vision.','Wir gestalten eine persönliche Reiseroute, die Ihre Vision widerspiegelt.'],
's3.t':['Arrange','Organizar','Organiser','Organisieren'],
's3.d':['We coordinate the essential elements with care and precision.','Coordinamos los elementos esenciales con atención y precisión.','Nous coordonnons les éléments essentiels avec soin et précision.','Wir koordinieren alle wesentlichen Elemente mit Sorgfalt und Präzision.'],
's4.t':['Experience','Vivir','Vivre','Erleben'],
's4.d':['Enjoy extraordinary places and meaningful moments.','Disfruta lugares extraordinarios y momentos memorables.','Profitez de lieux extraordinaires et de moments inoubliables.','Genießen Sie außergewöhnliche Orte und bedeutungsvolle Momente.'],
'cel.title':['Celebrate life, beautifully.','Celebra la vida de manera extraordinaria.','Célébrez la vie, avec élégance.','Feiern Sie das Leben – mit Stil.'],
'cel.text':['From unforgettable honeymoons to milestone anniversaries and private group escapes, we curate experiences that honor life’s most meaningful occasions.','Desde lunas de miel inolvidables hasta aniversarios y escapadas privadas en grupo, diseñamos experiencias que honran los momentos más significativos de la vida.','Des lunes de miel inoubliables aux anniversaires marquants et aux escapades privées en groupe, nous composons des expériences qui honorent les moments les plus importants de la vie.','Von unvergesslichen Flitterwochen über besondere Jubiläen bis zu privaten Gruppenauszeiten gestalten wir Erlebnisse, die die bedeutendsten Anlässe des Lebens würdigen.'],
'cel1.t':['Honeymoons & romantic escapes','Lunas de miel y escapadas románticas','Lunes de miel et escapades romantiques','Flitterwochen & romantische Auszeiten'],
'cel1.d':['Begin your next chapter with romance, discovery, and unforgettable moments together.','Comienza una nueva etapa con romance, descubrimiento y momentos inolvidables en pareja.','Ouvrez votre prochain chapitre avec romance, découverte et moments inoubliables à deux.','Beginnen Sie Ihr nächstes Kapitel mit Romantik, Entdeckung und unvergesslichen gemeinsamen Momenten.'],
'cel2.t':['Anniversaries & milestones','Aniversarios y ocasiones especiales','Anniversaires et étapes marquantes','Jubiläen & Meilensteine'],
'cel2.d':['Celebrate meaningful occasions in remarkable places, with thoughtful details.','Celebra ocasiones significativas en lugares excepcionales, con detalles cuidadosamente pensados.','Célébrez les occasions importantes dans des lieux remarquables, avec des attentions soignées.','Feiern Sie bedeutsame Anlässe an besonderen Orten – mit liebevollen Details.'],
'cel3.t':['Private group escapes','Escapadas privadas en grupo','Escapades privées en groupe','Private Gruppenauszeiten'],
'cel3.d':['Reconnect with family and friends through exclusive journeys.','Comparte momentos extraordinarios con familiares y amigos mediante viajes exclusivos.','Retrouvez famille et amis lors de voyages exclusifs.','Finden Sie mit Familie und Freunden auf exklusiven Reisen wieder zusammen.'],
'cel.cta':['Create your celebration','Diseña tu celebración','Créez votre célébration','Gestalten Sie Ihre Feier'],
'st.title':['Inspired by the world. Rooted in Guatemala.','Inspirados por el mundo. Con raíces en Guatemala.','Inspirés par le monde. Enracinés au Guatemala.','Inspiriert von der Welt. Verwurzelt in Guatemala.'],
'st.text':['AVIORA was born from a passion for meaningful travel, extraordinary places, and the belief that memorable experiences deserve thoughtful design. We see travel as a chance to discover perspectives, connect with cultures, celebrate moments, and create lasting memories.','AVIORA nace de la pasión por los viajes memorables, los lugares extraordinarios y la convicción de que las experiencias especiales merecen ser cuidadosamente diseñadas. Entendemos los viajes como una oportunidad para descubrir perspectivas, conectar con culturas, celebrar momentos y crear recuerdos duraderos.','AVIORA est née d’une passion pour les voyages porteurs de sens, les lieux extraordinaires et la conviction que les expériences mémorables méritent une conception soignée. Nous voyons le voyage comme une occasion de découvrir d’autres perspectives, de rencontrer des cultures, de célébrer des moments et de créer des souvenirs durables.','AVIORA entstand aus der Leidenschaft für bedeutungsvolles Reisen, außergewöhnliche Orte und die Überzeugung, dass unvergessliche Erlebnisse sorgfältige Gestaltung verdienen. Für uns ist Reisen die Chance, neue Perspektiven zu entdecken, Kulturen zu begegnen, Momente zu feiern und bleibende Erinnerungen zu schaffen.'],
'st.close':['At AVIORA, every journey begins with a story. Let us help you create yours.','En AVIORA, cada viaje comienza con una historia. Permítenos ayudarte a crear la tuya.','Chez AVIORA, chaque voyage commence par une histoire. Laissez-nous vous aider à écrire la vôtre.','Bei AVIORA beginnt jede Reise mit einer Geschichte. Lassen Sie uns helfen, Ihre zu schreiben.'],
'gal.title':['A few glimpses','Algunos destellos','Quelques aperçus','Einige Einblicke'],
'p.title':['Your extraordinary journey begins here.','Tu viaje extraordinario comienza aquí.','Votre voyage extraordinaire commence ici.','Ihre außergewöhnliche Reise beginnt hier.'],
'p.text':['Tell us about the places you dream of discovering and the experiences that inspire you.','Cuéntanos qué lugares sueñas con descubrir y qué experiencias te inspiran.','Dites-nous quels lieux vous rêvez de découvrir et quelles expériences vous inspirent.','Erzählen Sie uns, welche Orte Sie entdecken möchten und welche Erlebnisse Sie inspirieren.'],
'f.name':['Full name','Nombre completo','Nom complet','Vollständiger Name'],
'f.email':['Email','Correo electrónico','E-mail','E-Mail'],
'f.country':['Country of residence','País de residencia','Pays de résidence','Wohnsitzland'],
'f.phone':['Phone (optional)','Teléfono (opcional)','Téléphone (facultatif)','Telefon (optional)'],
'f.dest':['Preferred destination','Destino preferido','Destination souhaitée','Wunschziel'],
'f.open':['Not sure yet','Aún no lo sé','Pas encore décidé','Noch unentschlossen'],
'f.dates':['Approximate dates','Fechas aproximadas','Dates approximatives','Ungefähre Reisedaten'],
'f.dates.ph':['e.g. March 2027, 10 days','p. ej. marzo de 2027, 10 días','p. ex. mars 2027, 10 jours','z. B. März 2027, 10 Tage'],
'f.trav':['Number of travelers','Número de viajeros','Nombre de voyageurs','Anzahl der Reisenden'],
'f.type':['Type of experience','Tipo de experiencia','Type d’expérience','Art des Erlebnisses'],
'f.budget':['Estimated total budget (USD)','Presupuesto total estimado (USD)','Budget total estimé (USD)','Geschätztes Gesamtbudget (USD)'],
'f.msg':['Tell us more','Cuéntanos más','Dites-nous en plus','Erzählen Sie uns mehr'],
'f.msg.ph':['Occasions, interests, who is traveling…','Ocasiones, intereses, quién viaja…','Occasions, centres d’intérêt, qui voyage…','Anlässe, Interessen, wer mitreist …'],
'f.consent':['I agree to the Privacy Policy and to be contacted about my inquiry.','Acepto la Política de privacidad y que se me contacte sobre mi consulta.','J’accepte la politique de confidentialité et d’être contacté(e) au sujet de ma demande.','Ich stimme der Datenschutzerklärung zu und möchte zu meiner Anfrage kontaktiert werden.'],
'f.submit':['Begin my journey','Comenzar mi viaje','Commencer mon voyage','Meine Reise beginnen'],
'f.sending':['Sending…','Enviando…','Envoi…','Wird gesendet…'],
'f.sel':['Select…','Selecciona…','Sélectionner…','Auswählen…'],
'f.err.req':['Please complete this field.','Completa este campo.','Veuillez remplir ce champ.','Bitte füllen Sie dieses Feld aus.'],
'f.err.email':['Enter a valid email address.','Ingresa un correo válido.','Saisissez une adresse e-mail valide.','Geben Sie eine gültige E-Mail-Adresse ein.'],
'f.err.consent':['Please accept to continue.','Acepta para continuar.','Veuillez accepter pour continuer.','Bitte stimmen Sie zu, um fortzufahren.'],
'f.thanks.t':['Thank you.','Gracias.','Merci.','Vielen Dank.'],
'f.thanks':['Thank you for contacting AVIORA. We look forward to learning about your travel aspirations. Our team will be in touch soon.','Gracias por contactar a AVIORA. Nos encantará conocer tus sueños de viaje. Nuestro equipo se pondrá en contacto contigo próximamente.','Merci d’avoir contacté AVIORA. Nous sommes impatients de découvrir vos envies de voyage. Notre équipe vous contactera très prochainement.','Vielen Dank für Ihre Nachricht an AVIORA. Wir freuen uns darauf, Ihre Reiseträume kennenzulernen. Unser Team meldet sich in Kürze bei Ihnen.'],
'f.again':['Send another inquiry','Enviar otra consulta','Envoyer une autre demande','Weitere Anfrage senden'],
'c.or':['Prefer to talk?','¿Prefieres conversar?','Vous préférez échanger ?','Lieber persönlich sprechen?'],
'c.wa.t':['Chat on WhatsApp','Escríbenos por WhatsApp','Écrivez-nous sur WhatsApp','Per WhatsApp schreiben'],
'c.wa.msg':['Hello AVIORA, I would like to plan a journey.','Hola AVIORA, me gustaría planificar un viaje.','Bonjour AVIORA, je souhaite planifier un voyage.','Hallo AVIORA, ich möchte eine Reise planen.'],
'c.cal':['Book a call','Agenda una llamada','Réserver un appel','Gespräch buchen'],
'c.cal.soon':['The scheduling link will be available soon. Meanwhile, send your inquiry or request a call back.','El enlace de agenda estará disponible pronto. Mientras tanto, envía tu consulta o solicita una llamada.','Le lien de réservation sera bientôt disponible. En attendant, envoyez votre demande ou demandez à être rappelé(e).','Der Buchungslink folgt in Kürze. Senden Sie bis dahin Ihre Anfrage oder fordern Sie einen Rückruf an.'],
'c.call':['Request a call back','Solicita que te llamemos','Demander à être rappelé(e)','Rückruf anfordern'],
'c.call.phone':['Phone number','Número de teléfono','Numéro de téléphone','Telefonnummer'],
'c.call.time':['Best time to call','Mejor horario para llamar','Meilleur moment pour vous appeler','Beste Anrufzeit'],
'c.call.send':['Request call','Solicitar llamada','Demander l’appel','Rückruf anfordern'],
'c.call.ok':['Call requested. We will reach out at the time you chose.','Llamada solicitada. Te contactaremos en el horario elegido.','Appel demandé. Nous vous contacterons au moment choisi.','Rückruf angefordert. Wir melden uns zur gewählten Zeit.'],
't.am':['Morning','Mañana','Matin','Vormittag'],
't.pm':['Afternoon','Tarde','Après-midi','Nachmittag'],
't.eve':['Evening','Noche','Soir','Abend'],
'faq.title':['Questions, answered.','Preguntas frecuentes','Vos questions','Häufige Fragen'],
'q1':['Do you offer customized itineraries?','¿Ofrecen itinerarios personalizados?','Proposez-vous des itinéraires personnalisés ?','Bieten Sie individuelle Reiserouten an?'],
'a1':['Yes. Every itinerary is tailored to traveler preferences, dates, and interests.','Sí. Cada itinerario se adapta a las preferencias, fechas e intereses del viajero.','Oui. Chaque itinéraire est adapté aux préférences, aux dates et aux centres d’intérêt du voyageur.','Ja. Jede Reiseroute wird auf Vorlieben, Reisedaten und Interessen der Reisenden abgestimmt.'],
'q2':['Do you arrange travel beyond Guatemala?','¿Organizan viajes fuera de Guatemala?','Organisez-vous des voyages hors du Guatemala ?','Organisieren Sie Reisen außerhalb Guatemalas?'],
'a2':['Yes, through selected destinations and travel partners, subject to confirmation.','Sí, mediante destinos y aliados seleccionados, sujetos a confirmación.','Oui, via des destinations et des partenaires sélectionnés, sous réserve de confirmation.','Ja, über ausgewählte Reiseziele und Reisepartner, vorbehaltlich der Bestätigung.'],
'q3':['How far ahead should I inquire?','¿Con cuánta anticipación debo consultar?','Combien de temps à l’avance faut-il vous contacter ?','Wie weit im Voraus sollte ich anfragen?'],
'a3':['As early as possible, particularly for peak seasons and special occasions.','Con la mayor anticipación posible, especialmente en temporadas altas y ocasiones especiales.','Le plus tôt possible, surtout pour la haute saison et les occasions spéciales.','So früh wie möglich, besonders für die Hochsaison und besondere Anlässe.'],
'q4':['Are experiences private?','¿Las experiencias son privadas?','Les expériences sont-elles privées ?','Sind die Erlebnisse privat?'],
'a4':['We specialize in private arrangements, subject to the selected service and availability.','Nos especializamos en servicios privados, sujetos al servicio elegido y su disponibilidad.','Nous sommes spécialisés dans les prestations privées, selon le service choisi et les disponibilités.','Wir sind auf private Arrangements spezialisiert, abhängig vom gewählten Service und der Verfügbarkeit.'],
'q5':['How do I begin?','¿Cómo comienzo?','Comment commencer ?','Wie beginne ich?'],
'a5':['Complete our inquiry form and we will contact you about next steps.','Completa nuestro formulario y te contactaremos para conversar sobre los siguientes pasos.','Remplissez notre formulaire et nous vous contacterons pour échanger sur la suite.','Füllen Sie unser Anfrageformular aus – wir melden uns zu den nächsten Schritten.'],
'ft.tag':['Rooted in Guatemala. Inspired by the World.','Con raíces en Guatemala. Inspirados por el mundo.','Enracinés au Guatemala. Inspirés par le monde.','Verwurzelt in Guatemala. Inspiriert von der Welt.'],
'ft.nav':['Explore','Explorar','Explorer','Entdecken'],
'ft.contact':['Contact','Contacto','Contact','Kontakt'],
'ft.email':['Email · [official email]','Correo · [correo oficial]','E-mail · [e-mail officiel]','E-Mail · [offizielle E-Mail]'],
'ft.phone':['[phone]','[teléfono]','[téléphone]','[Telefon]'],
'ft.ig':['[account]','[cuenta]','[compte]','[Konto]'],
'ft.priv':['Privacy Policy','Política de privacidad','Politique de confidentialité','Datenschutz'],
'ft.terms':['Terms','Términos','Conditions','Bedingungen'],
'ft.cookie':['Cookie Policy','Cookies','Politique relative aux cookies','Cookie-Richtlinie'],
'meta.title':['AVIORA | Luxury Travel & Bespoke Experiences','AVIORA | Viajes de lujo y experiencias a medida','AVIORA | Voyages de luxe et expériences sur mesure','AVIORA | Luxusreisen & maßgeschneiderte Erlebnisse'],
'meta.desc':['AVIORA designs private luxury journeys and bespoke experiences. Rooted in Guatemala, inspired by the world.','AVIORA diseña viajes de lujo privados y experiencias a medida. Con raíces en Guatemala, inspirados por el mundo.','AVIORA conçoit des voyages de luxe privés et des expériences sur mesure. Enracinés au Guatemala, inspirés par le monde.','AVIORA gestaltet private Luxusreisen und maßgeschneiderte Erlebnisse. Verwurzelt in Guatemala, inspiriert von der Welt.']
};
var BUDGET = {
  en:['Up to $10,000','$10,000 – $25,000','$25,000 – $50,000','$50,000+','Prefer to discuss'],
  es:['Hasta $10,000','$10,000 – $25,000','$25,000 – $50,000','Más de $50,000','Prefiero conversarlo'],
  fr:['Jusqu’à 10 000 $','10 000 – 25 000 $','25 000 – 50 000 $','Plus de 50 000 $','Je préfère en discuter'],
  de:['Bis 10.000 $','10.000 – 25.000 $','25.000 – 50.000 $','Über 50.000 $','Lieber im Gespräch klären'],
  ja:['〜1万ドル','1万〜2.5万ドル','2.5万〜5万ドル','5万ドル以上','相談して決めたい'],
  zh:['1万美元以内','1万–2.5万美元','2.5万–5万美元','5万美元以上','希望沟通后确定'],
  ko:['1만 달러 이하','1만–2.5만 달러','2.5만–5만 달러','5만 달러 이상','상담 후 결정'],
  it:['Fino a 10.000 $','10.000 – 25.000 $','25.000 – 50.000 $','Oltre 50.000 $','Preferisco discuterne']
};
var LANGS = ['en','es','fr','de','ja','zh','ko','it'];
var ENABLED = ['en','es','fr','de','it','zh'];
var CODES = {en:'EN',es:'ES',fr:'FR',de:'DE',ja:'JA',zh:'ZH',ko:'KO',it:'IT'};
/* Italian */
var T3 = {
'skip':'Vai al contenuto',
'aria.nav':'Navigazione principale',
'aria.less':'Meno viaggiatori',
'aria.more':'Più viaggiatori',
'nav.dest':'Destinazioni',
'nav.exp':'Esperienze',
'nav.expFull':'Esperienze signature',
'nav.bespoke':'Viaggi su misura',
'nav.cel':'Celebrazioni',
'nav.celFull':'Celebrazioni ed evasioni',
'nav.story':'La nostra storia',
'nav.plan':'Pianifica il tuo viaggio',
'nav.menu':'Menu',
'nav.close':'Chiudi',
'nav.top':'Torna su',
'lang.label':'Lingua',
'hero.title':'L’arte del viaggio straordinario',
'hero.sub':'Destinazioni eccezionali. Esperienze significative. Viaggi disegnati con cura intorno a te.',
'hero.cta1':'Pianifica il tuo viaggio',
'hero.cta2':'Esplora le destinazioni',
'hero.scroll':'Scorri',
'man.title':'Oltre il viaggio. Verso esperienze straordinarie.',
'man.text':'Crediamo che il vero lusso risieda nei dettagli, nella libertà di esplorare al proprio ritmo e nel privilegio di vivere il mondo in modo profondamente personale.',
'intro.text':'Scopri un mondo in cui viaggiare diventa un’arte. In AVIORA creiamo viaggi eccezionali, soggiorni straordinari ed esperienze indimenticabili per chi cerca qualcosa oltre l’ordinario. Con radici in Guatemala e lo sguardo rivolto al mondo, ogni viaggio è pensato con cura per riflettere le tue passioni, i tuoi desideri e il tuo spirito di scoperta.',
'c.regions':'Regioni signature in Guatemala',
'c.collections':'Collezioni di esperienze signature',
'c.worlds':'Regioni del mondo oltre il Guatemala',
'c.langs':'Lingue, una sola conversazione',
'phil.title':'Selezionato con cura. Interamente tuo.',
'phil.text':'Ogni destinazione ha una storia. Ogni viaggiatore ha una visione. Le uniamo attraverso un’ospitalità eccezionale, esperienze autentiche e un’attenzione sincera ai dettagli.',
'cta.design':'Progetta il tuo viaggio',
'gt.title':'Luoghi straordinari. Possibilità infinite.',
'gt.text':'Quattro regioni del Guatemala, ognuna con il proprio ritmo. Passa il cursore sulla mappa o scegli un luogo per scoprire cosa ti aspetta.',
'gt.pick':'Scegli un luogo',
'gt.map':'Mappa stilizzata del Guatemala',
'gt.inc':'Può includere',
'gt.cta':'Progetta qui un viaggio',
'd.ant.n':'Antigua Guatemala',
'd.ant.t':'Eleganza senza tempo',
'd.ant.x':'Passeggia tra strade acciottolate, scopri un’architettura straordinaria e immergiti in una destinazione dove storia, cultura e lusso contemporaneo si incontrano.',
'd.ant.e1':'Cene private in cortili storici',
'd.ant.e2':'Passeggiate tra architettura e patrimonio',
'd.ant.e3':'Serate in terrazza di fronte ai vulcani',
'd.atit.n':'Lago Atitlán',
'd.atit.t':'Dove la natura ispira',
'd.atit.x':'Circondato da vulcani maestosi e villaggi pittoreschi, il lago Atitlán offre rifugi appartati sulle sue rive, viaggi privati in barca, esperienze di benessere e incontri culturali autentici.',
'd.atit.e1':'Viaggi privati in barca tra i villaggi',
'd.atit.e2':'Rituali di benessere in riva al lago',
'd.atit.e3':'Incontri con le tessitrici maya',
'd.pet.n':'Petén e Tikal',
'd.pet.t':'Meraviglie antiche',
'd.pet.x':'Viaggia nel cuore del mondo maya, dove tesori archeologici emergono da lussureggianti foreste tropicali. Scopri la storia antica con esperienze guidate in privato.',
'd.pet.e1':'Visita guidata privata a Tikal',
'd.pet.e2':'Alba sopra la volta della giungla',
'd.pet.e3':'Voli panoramici sulla regione',
'd.pac.n':'Costa del Pacifico',
'd.pac.t':'Rifugi sul mare',
'd.pac.x':'Scopri la costa pacifica del Guatemala, dove sabbie vulcaniche, paesaggi oceanici e quieti rifugi sul mare invitano a rilassarsi.',
'd.pac.e1':'Rifugi fronte mare su sabbia vulcanica',
'd.pac.e2':'Tramonti sull’oceano',
'd.pac.e3':'Benessere e riposo in riva al mare',
'w.title':'Oltre il Guatemala. Il mondo ti aspetta.',
'w.text':'Dall’Europa romantica ai safari africani, dai tesori culturali asiatici alle fughe sulle isole, AVIORA progetta viaggi internazionali intorno ai tuoi sogni di viaggio.',
'w.map':'Mappa del mondo interattiva',
'w.filter':'Filtra per regione',
'w.all':'Tutte',
'w.eu':'Europa',
'w.as':'Asia',
'w.af':'Africa',
'w.me':'Medio Oriente',
'w.is':'Isole esclusive',
'w.req':'Disponibile su richiesta',
'w.gt.n':'Guatemala',
'w.gt.x':'Dove inizia ogni viaggio AVIORA.',
'w.gt.cta':'Esplora il Guatemala',
'w.it.n':'Italia',
'w.it.x':'Villaggi costieri, città storiche e lunghi pranzi sul mare.',
'w.jp.n':'Giappone',
'w.jp.x':'Templi silenziosi, cucina raffinata e tradizioni che premiano il viaggio lento.',
'w.ea.n':'Africa orientale',
'w.ea.x':'Safari privati e orizzonti sconfinati, guidati da una profonda conoscenza del territorio.',
'w.jo.n':'Giordania',
'w.jo.x':'Antiche città di pietra e notti nel deserto sotto un cielo pieno di stelle.',
'w.mv.n':'Maldive',
'w.mv.x':'Isole private, acque cristalline e quiete assoluta.',
'x.title':'Momenti oltre l’ordinario.',
'x.text':'Le nostre esperienze signature celebrano la scoperta, l’autenticità, l’ospitalità eccezionale e i momenti che lasciano il segno.',
'x.drag':'Trascina',
'x.open':'Apri',
'x.prev':'Precedente',
'x.next':'Successivo',
'x.cta':'Progetta questa esperienza',
'x1.n':'Cene private e viaggi culinari',
'x1.s':'Scopri una destinazione attraverso i suoi sapori.',
'x1.l':'Scopri una destinazione attraverso i suoi sapori: cene private, incontri con gli chef, degustazioni selezionate ed eccezionali scenari gastronomici.',
'x1.i1':'Cena privata con chef',
'x1.i2':'Degustazioni selezionate',
'x1.i3':'Cenare in ambienti unici',
'x2.n':'Benessere e fughe rigeneranti',
'x2.s':'Ritrova te stesso nella quiete.',
'x2.l':'Ritrova te stesso attraverso rifugi tranquilli, esperienze di benessere personalizzate e spa eccezionali.',
'x2.i1':'Rituali spa privati',
'x2.i2':'Movimento consapevole all’alba',
'x2.i3':'Ritiri silenziosi nella natura',
'x3.n':'Romanticismo e celebrazioni',
'x3.s':'Momenti intimi, progettati con cura.',
'x3.l':'Celebra viaggi di nozze, anniversari e traguardi importanti con esperienze intime, pensate nei minimi dettagli.',
'x3.i1':'Cene a lume di candela per due',
'x3.i2':'Sorprese organizzate in anticipo',
'x3.i3':'Spazi privati per l’occasione',
'x4.n':'Soggiorni eccezionali',
'x4.s':'Hotel e ville scelti per il loro carattere.',
'x4.l':'Scopri hotel boutique, resort eccezionali, ville private e rifugi straordinari selezionati per carattere e ospitalità.',
'x4.i1':'Hotel boutique',
'x4.i2':'Ville private',
'x4.i3':'Rifugi straordinari',
'x5.n':'Avventure private',
'x5.s':'Paesaggi visti dall’alto, dall’acqua e a piedi.',
'x5.l':'Esplora paesaggi straordinari con voli panoramici, escursioni private nella natura e avventure all’aria aperta fuori dal comune.',
'x5.i1':'Voli panoramici',
'x5.i2':'Escursioni private nella natura',
'x5.i3':'Viaggi tra laghi e vulcani',
'x6.n':'Cultura e patrimonio',
'x6.s':'Incontra chi tiene vive le tradizioni.',
'x6.l':'Entra in contatto con le tradizioni locali attraverso scoperte private, artigianato tradizionale e incontri culturali significativi.',
'x6.i1':'Laboratori con maestri artigiani',
'x6.i2':'Visite private al patrimonio',
'x6.i3':'Conversazioni con guide locali',
'x7.n':'Viaggi in famiglia e multigenerazionali',
'x7.s':'Ricordi condivisi tra generazioni.',
'x7.l':'Crea ricordi tra generazioni con avventure private, scoperte culturali e soggiorni eccezionali.',
'x7.i1':'Itinerari dal ritmo adatto a ogni età',
'x7.i2':'Esperienze private condivise',
'x7.i3':'Soggiorni spaziosi per tutta la famiglia',
'b.title':'Il tuo mondo. A modo tuo.',
'b.text':'Non esistono due viaggiatori uguali. Non dovrebbero esserlo nemmeno i loro viaggi. AVIORA crea itinerari personalizzati con soggiorni eccezionali, esperienze private, trasporti e dettagli scelti con cura.',
's1.t':'Scoprire',
's1.d':'Ascoltiamo le tue aspirazioni, preferenze e desideri di viaggio.',
's2.t':'Progettare',
's2.d':'Creiamo un itinerario personalizzato che riflette la tua visione.',
's3.t':'Organizzare',
's3.d':'Coordiniamo gli elementi essenziali con cura e precisione.',
's4.t':'Vivere',
's4.d':'Goditi luoghi straordinari e momenti significativi.',
'cel.title':'Celebra la vita, con eleganza.',
'cel.text':'Dai viaggi di nozze indimenticabili agli anniversari importanti e alle fughe private di gruppo, curiamo esperienze che onorano i momenti più significativi della vita.',
'cel1.t':'Viaggi di nozze e fughe romantiche',
'cel1.d':'Inizia il tuo prossimo capitolo con romanticismo, scoperta e momenti indimenticabili insieme.',
'cel2.t':'Anniversari e traguardi',
'cel2.d':'Celebra occasioni significative in luoghi straordinari, con dettagli curati.',
'cel3.t':'Fughe private di gruppo',
'cel3.d':'Ritrova famiglia e amici attraverso viaggi esclusivi.',
'cel.cta':'Crea la tua celebrazione',
'st.title':'Ispirati dal mondo. Radicati in Guatemala.',
'st.text':'AVIORA nasce dalla passione per il viaggio significativo, per i luoghi straordinari e dalla convinzione che le esperienze memorabili meritino un design accurato. Vediamo il viaggio come un’occasione per scoprire prospettive, entrare in contatto con le culture, celebrare momenti e creare ricordi duraturi.',
'st.close':'In AVIORA ogni viaggio inizia con una storia. Lascia che ti aiutiamo a creare la tua.',
'gal.title':'Qualche scorcio',
'p.title':'Il tuo viaggio straordinario inizia qui.',
'p.text':'Raccontaci quali luoghi sogni di scoprire e quali esperienze ti ispirano.',
'f.name':'Nome e cognome',
'f.email':'E-mail',
'f.country':'Paese di residenza',
'f.phone':'Telefono (facoltativo)',
'f.dest':'Destinazione preferita',
'f.open':'Non ancora deciso',
'f.dates':'Date indicative',
'f.dates.ph':'es. marzo 2027, 10 giorni',
'f.trav':'Numero di viaggiatori',
'f.type':'Tipo di esperienza',
'f.budget':'Budget totale stimato (USD)',
'f.msg':'Raccontaci di più',
'f.msg.ph':'Occasioni, interessi, chi viaggia…',
'f.consent':'Accetto l’informativa sulla privacy e di essere contattato in merito alla mia richiesta.',
'f.submit':'Inizia il mio viaggio',
'f.sending':'Invio in corso…',
'f.sel':'Seleziona…',
'f.err.req':'Compila questo campo.',
'f.err.email':'Inserisci un indirizzo e-mail valido.',
'f.err.consent':'Accetta per continuare.',
'f.thanks.t':'Grazie.',
'f.thanks':'Grazie per aver contattato AVIORA. Non vediamo l’ora di conoscere le tue aspirazioni di viaggio. Il nostro team ti contatterà presto.',
'f.again':'Invia un’altra richiesta',
'c.or':'Preferisci parlarne?',
'c.wa.t':'Scrivici su WhatsApp',
'c.wa.msg':'Buongiorno AVIORA, vorrei pianificare un viaggio.',
'c.cal':'Prenota una chiamata',
'c.cal.soon':'Il link per la prenotazione sarà disponibile a breve. Nel frattempo, invia la tua richiesta o chiedi di essere richiamato.',
'c.call':'Richiedi di essere richiamato',
'c.call.phone':'Numero di telefono',
'c.call.time':'Orario migliore per chiamarti',
'c.call.send':'Richiedi la chiamata',
'c.call.ok':'Chiamata richiesta. Ti contatteremo all’orario scelto.',
't.am':'Mattina',
't.pm':'Pomeriggio',
't.eve':'Sera',
'faq.title':'Domande frequenti',
'q1':'Offrite itinerari personalizzati?',
'a1':'Sì. Ogni itinerario è su misura per le preferenze, le date e gli interessi del viaggiatore.',
'q2':'Organizzate viaggi anche fuori dal Guatemala?',
'a2':'Sì, attraverso destinazioni e partner di viaggio selezionati, salvo conferma.',
'q3':'Con quanto anticipo devo contattarvi?',
'a3':'Il prima possibile, in particolare per l’alta stagione e le occasioni speciali.',
'q4':'Le esperienze sono private?',
'a4':'Siamo specializzati in servizi privati, in base al servizio scelto e alla disponibilità.',
'q5':'Come inizio?',
'a5':'Compila il nostro modulo di richiesta e ti contatteremo per i prossimi passi.',
'ft.tag':'Radicati in Guatemala. Ispirati dal mondo.',
'ft.nav':'Esplora',
'ft.contact':'Contatti',
'ft.email':'E-mail · [e-mail ufficiale]',
'ft.phone':'[telefono]',
'ft.ig':'[account]',
'ft.priv':'Informativa sulla privacy',
'ft.terms':'Termini',
'ft.cookie':'Cookie Policy',
'meta.title':'AVIORA | Viaggi di lusso ed esperienze su misura',
'meta.desc':'AVIORA progetta viaggi di lusso privati ed esperienze su misura. Radicati in Guatemala, ispirati dal mondo.'
};
/* Japanese / Simplified Chinese / Korean: [ja, zh, ko] */
var T2 = {
'skip':['コンテンツへスキップ','跳转到内容','본문으로 건너뛰기'],
'aria.nav':['メインナビゲーション','主导航','주 내비게이션'],
'aria.less':['旅行者を減らす','减少旅客人数','여행자 줄이기'],
'aria.more':['旅行者を増やす','增加旅客人数','여행자 늘리기'],
'nav.dest':['目的地','目的地','여행지'],
'nav.exp':['体験','体验','경험'],
'nav.expFull':['シグネチャー体験','专属体验','시그니처 경험'],
'nav.bespoke':['オーダーメイドの旅','私人定制旅程','맞춤 여행'],
'nav.cel':['祝祭','庆典','기념일'],
'nav.celFull':['祝祭とエスケープ','庆典与小憩','기념일 & 휴식'],
'nav.story':['私たちの物語','我们的故事','우리의 이야기'],
'nav.plan':['旅を計画する','规划您的旅程','여행 계획하기'],
'nav.menu':['メニュー','菜单','메뉴'],
'nav.close':['閉じる','关闭','닫기'],
'nav.top':['トップへ戻る','返回顶部','맨 위로'],
'lang.label':['言語','语言','언어'],
'hero.title':['非凡な旅という芸術','非凡旅行的艺术','특별한 여행의 예술'],
'hero.sub':['卓越した目的地。心に残る体験。あなたのために美しく設計された旅。','卓越的目的地。难忘的体验。为您精心设计的旅程。','탁월한 여행지. 의미 있는 경험. 당신을 위해 아름답게 설계된 여행.'],
'hero.cta1':['旅を計画する','规划您的旅程','여행 계획하기'],
'hero.cta2':['目的地を見る','探索目的地','여행지 둘러보기'],
'hero.scroll':['スクロール','向下滚动','스크롤'],
'man.title':['旅の、その先へ。非凡な体験の中へ。','超越旅行，步入非凡体验。','여행 그 너머, 특별한 경험 속으로.'],
'man.text':['真のラグジュアリーとは、細部に宿り、自分のペースで探索できる自由であり、世界をきわめて個人的な方法で体験できる特権だと私たちは考えます。','我们相信，真正的奢华体现在细节之中，体现在以自己的节奏探索的自由，以及以深度个性化的方式体验世界的特权。','진정한 럭셔리는 디테일에, 나만의 속도로 탐험할 수 있는 자유에, 그리고 세상을 깊이 개인적인 방식으로 경험하는 특권에 있다고 우리는 믿습니다.'],
'intro.text':['旅が芸術になる世界をご体験ください。AVIORAは、日常を超えるものを求める旅人のために、卓越した旅、特別な滞在、忘れられない体験を丁寧にキュレーションします。グアテマラに根ざし、世界に着想を得て、すべての旅はあなたの情熱、願い、発見の心を映すよう細やかに設計されます。','探索旅行成为艺术的世界。AVIORA 为追求非凡的旅行者精心策划卓越的旅程、特别的住宿与难忘的体验。我们扎根危地马拉，放眼世界，每一次旅程都经过用心设计，只为呈现您的热情、愿望与探索精神。','여행이 예술이 되는 세계를 만나 보세요. AVIORA는 평범함 그 이상을 찾는 여행자를 위해 탁월한 여정, 특별한 숙박, 잊지 못할 경험을 세심하게 큐레이션합니다. 과테말라에 뿌리를 두고 세계에서 영감을 얻어, 모든 여행은 당신의 열정과 바람, 발견의 감각을 담도록 정성껏 설계됩니다.'],
'c.regions':['グアテマラのシグネチャー地域','危地马拉的特色地区','과테말라 시그니처 지역'],
'c.collections':['シグネチャー体験のコレクション','专属体验系列','시그니처 경험 컬렉션'],
'c.worlds':['グアテマラ以外の世界の地域','危地马拉以外的世界地区','과테말라 밖 세계 지역'],
'c.langs':['言語は違っても、対話はひとつ','多种语言，一场对话','여러 언어, 하나의 대화'],
'phil.title':['美しくキュレーション。すべてあなたのために。','精心策划，专属于您。','아름답게 큐레이션하고, 온전히 당신만을 위해.'],
'phil.text':['どの目的地にも物語があり、どの旅人にもビジョンがあります。私たちは卓越したおもてなし、本物の体験、細部への心配りで、その二つを結び合わせます。','每个目的地都有一个故事，每位旅行者都有一个愿景。我们以卓越的待客之道、真实的体验和对细节的用心，将两者联结在一起。','모든 여행지에는 이야기가 있고, 모든 여행자에게는 비전이 있습니다. 우리는 탁월한 환대와 진정성 있는 경험, 세심한 배려로 이 둘을 이어 드립니다.'],
'cta.design':['旅をデザインする','设计您的旅程','여행 설계하기'],
'gt.title':['非凡な場所。尽きない可能性。','非凡之地，无限可能。','특별한 장소, 끝없는 가능성.'],
'gt.text':['グアテマラの4つの地域、それぞれが独自のリズムを持っています。地図にカーソルを合わせるか、場所を選んで、そこに待つものをご覧ください。','危地马拉的四大地区，各有独特的节奏。将光标移到地图上，或选择一个地点，看看那里有什么在等待您。','과테말라의 네 지역은 저마다 고유한 리듬을 지니고 있습니다. 지도 위에 커서를 올리거나 장소를 선택해 무엇이 기다리는지 확인해 보세요.'],
'gt.pick':['場所を選ぶ','选择地点','장소 선택'],
'gt.map':['グアテマラの図案化された地図','危地马拉风格化地图','과테말라 스타일화 지도'],
'gt.inc':['含まれる内容の例','可包含','포함 가능한 경험'],
'gt.cta':['ここで旅をデザインする','在此设计旅程','이곳에서 여행 설계하기'],
'd.ant.n':['アンティグア・グアテマラ','危地马拉安提瓜','안티구아 과테말라'],
'd.ant.t':['時を超える優雅さ','永恒的优雅','시간을 초월한 우아함'],
'd.ant.x':['石畳の通りを歩き、見事な建築に出会い、歴史と文化、現代のラグジュアリーが交わる街に浸ってください。','漫步鹅卵石街道，发现非凡建筑，沉浸于历史、文化与当代奢华交汇的目的地。','돌길을 거닐며 뛰어난 건축을 발견하고, 역사와 문화, 현대적 럭셔리가 만나는 도시에 흠뻑 빠져 보세요.'],
'd.ant.e1':['歴史ある中庭でのプライベートディナー','在历史庭院中享用私人晚宴','역사적인 중정에서의 프라이빗 디너'],
'd.ant.e2':['建築と遺産をめぐる散策','建筑与遗产漫步','건축과 유산 산책'],
'd.ant.e3':['火山を望むルーフトップの夕べ','面朝火山的屋顶之夜','화산을 마주한 루프톱의 저녁'],
'd.atit.n':['アティトラン湖','阿蒂特兰湖','아티틀란 호수'],
'd.atit.t':['自然が心を満たす場所','自然启迪心灵之处','자연이 영감을 주는 곳'],
'd.atit.x':['雄大な火山と絵のような村々に囲まれたアティトラン湖には、人里離れた湖畔のリトリート、プライベートボートの旅、ウェルネス体験、本物の文化交流が待っています。','阿蒂特兰湖被雄伟的火山与如画的村庄环绕，这里有隐秘的湖畔度假居所、私人船游、身心疗愈体验以及真实的文化交流。','웅장한 화산과 그림 같은 마을에 둘러싸인 아티틀란 호수에는 한적한 호숫가 리트리트, 프라이빗 보트 여행, 웰니스 경험, 진정성 있는 문화 교류가 기다립니다.'],
'd.atit.e1':['村々を結ぶプライベートボートの旅','往返村落之间的私人船游','마을 사이를 잇는 프라이빗 보트 여행'],
'd.atit.e2':['湖畔でのウェルネスの儀式','湖畔疗愈仪式','호숫가 웰니스 의식'],
'd.atit.e3':['マヤの織り手と過ごす時間','与玛雅织女共度时光','마야 직조 장인과 보내는 시간'],
'd.pet.n':['ペテンとティカル','佩滕与蒂卡尔','페텐 & 티칼'],
'd.pet.t':['古代の驚異','远古奇观','고대의 경이'],
'd.pet.x':['マヤ世界の中心へ。生い茂る熱帯林の上に考古学の宝が姿を現します。プライベートガイドとともに、古代の歴史を発見してください。','深入玛雅世界的中心，考古瑰宝从茂密的热带森林中升起。在私人向导的带领下探索远古历史。','마야 세계의 심장부로 떠나 보세요. 울창한 열대림 위로 고고학적 보물이 솟아 있습니다. 프라이빗 가이드와 함께 고대의 역사를 만나 보세요.'],
'd.pet.e1':['プライベートガイドで巡るティカル','私人向导带领的蒂卡尔之旅','프라이빗 가이드와 함께하는 티칼 방문'],
'd.pet.e2':['ジャングルの樹冠に昇る朝日','丛林树冠之上的日出','정글 위로 떠오르는 일출'],
'd.pet.e3':['地域上空の遊覧飛行','区域上空观光飞行','지역 상공 유람 비행'],
'd.pac.n':['太平洋岸','太平洋海岸','태평양 해안'],
'd.pac.t':['海辺のリトリート','海滨度假居所','바닷가 리트리트'],
'd.pac.x':['火山性の砂浜、広がる海の景色、静かな海辺のリトリートが、心をほどいてくれるグアテマラの太平洋岸をご体験ください。','探索危地马拉的太平洋海岸，火山沙滩、海洋风光与宁静的海滨度假居所邀您放松身心。','화산 모래사장과 바다 풍경, 고요한 해변 리트리트가 여유를 안겨 주는 과테말라 태평양 해안을 만나 보세요.'],
'd.pac.e1':['火山性の砂浜に面したビーチフロントのリトリート','火山沙滩上的海滨度假居所','화산 모래 해변의 비치프런트 리트리트'],
'd.pac.e2':['海に沈む夕日','海上日落','바다 위로 지는 석양'],
'd.pac.e3':['海辺でのウェルネスと休息','海边身心疗愈与休憩','바닷가 웰니스와 휴식'],
'w.title':['グアテマラの先へ。世界が待っています。','超越危地马拉，世界在等您。','과테말라 너머, 세계가 기다립니다.'],
'w.text':['ロマンチックなヨーロッパからアフリカのサファリ、アジアの文化遺産、島のエスケープまで。AVIORAはあなたの旅の夢に合わせて海外の旅をデザインします。','从浪漫的欧洲到非洲野奢，从亚洲文化瑰宝到海岛度假，AVIORA 围绕您的旅行梦想设计国际旅程。','낭만적인 유럽부터 아프리카 사파리, 아시아의 문화 유산, 섬 휴양까지, AVIORA는 당신의 여행의 꿈에 맞춰 해외 여행을 설계합니다.'],
'w.map':['インタラクティブ世界地図','互动世界地图','인터랙티브 세계 지도'],
'w.filter':['地域で絞り込む','按地区筛选','지역별 필터'],
'w.all':['すべて','全部','전체'],
'w.eu':['ヨーロッパ','欧洲','유럽'],
'w.as':['アジア','亚洲','아시아'],
'w.af':['アフリカ','非洲','아프리카'],
'w.me':['中東','中东','중동'],
'w.is':['特別な島々','专属海岛','프라이빗 섬'],
'w.req':['ご要望に応じて対応','可应要求提供','요청 시 제공'],
'w.gt.n':['グアテマラ','危地马拉','과테말라'],
'w.gt.x':['すべてのAVIORAの旅が始まる場所。','每一段 AVIORA 旅程的起点。','모든 AVIORA 여행이 시작되는 곳.'],
'w.gt.cta':['グアテマラを探る','探索危地马拉','과테말라 둘러보기'],
'w.it.n':['イタリア','意大利','이탈리아'],
'w.it.x':['海辺の村々、歴史ある街並み、海を望む長いランチ。','海滨村落、历史名城，以及面朝大海的悠长午餐。','해안 마을과 역사 깊은 도시, 바다를 바라보며 즐기는 느긋한 점심.'],
'w.jp.n':['日本','日本','일본'],
'w.jp.x':['静かな寺院、洗練された料理、ゆっくり旅するほど味わい深くなる伝統。','静谧的寺院、精致的美食，以及值得慢游细品的传统。','고요한 사찰과 세련된 요리, 천천히 여행할수록 깊어지는 전통.'],
'w.ea.n':['東アフリカ','东非','동아프리카'],
'w.ea.x':['プライベートサファリと果てしない地平線を、深い現地の知識をもつガイドとともに。','私人野奢旅行与辽阔的地平线，由熟知当地的向导带领。','현지를 깊이 아는 가이드와 함께하는 프라이빗 사파리와 끝없는 지평선.'],
'w.jo.n':['ヨルダン','约旦','요르단'],
'w.jo.x':['古代の石の都市と、満天の星空の下で過ごす砂漠の夜。','古老的石城，以及繁星满天的沙漠之夜。','고대 석조 도시와 별이 가득한 하늘 아래의 사막의 밤.'],
'w.mv.n':['モルディブ','马尔代夫','몰디브'],
'w.mv.x':['プライベートアイランド、澄みきった海、完全な静寂。','私人岛屿、清澈海水与彻底的宁静。','프라이빗 아일랜드, 맑은 바다, 완전한 고요.'],
'x.title':['日常を超える瞬間。','超越日常的时刻。','일상을 넘어선 순간.'],
'x.text':['私たちのシグネチャー体験は、発見、本物らしさ、卓越したおもてなし、そして心に残る瞬間を讃えます。','我们的专属体验礼赞发现、真实、卓越的待客之道与有意义的时刻。','우리의 시그니처 경험은 발견과 진정성, 탁월한 환대, 그리고 의미 있는 순간을 담아냅니다.'],
'x.drag':['ドラッグ','拖动','드래그'],
'x.open':['開く','打开','열기'],
'x.prev':['前へ','上一个','이전'],
'x.next':['次へ','下一个','다음'],
'x.cta':['この体験をデザインする','设计此体验','이 경험 설계하기'],
'x1.n':['プライベートダイニングと美食の旅','私人晚宴与美食之旅','프라이빗 다이닝 & 미식 여행'],
'x1.s':['味わいを通して目的地を知る。','透过风味发现目的地。','맛을 통해 여행지를 만나다.'],
'x1.l':['味わいを通して目的地を発見しましょう。プライベートディナー、シェフとの出会い、厳選したテイスティング、特別な美食の舞台。','透过风味发现目的地：私人晚宴、与主厨的交流、精选品鉴，以及非凡的美食场景。','맛으로 여행지를 발견하세요. 프라이빗 디너, 셰프와의 만남, 엄선한 테이스팅, 특별한 미식 무대가 준비됩니다.'],
'x1.i1':['シェフによるプライベートディナー','主厨私人晚宴','셰프의 프라이빗 디너'],
'x1.i2':['厳選したテイスティング','精选品鉴','엄선한 테이스팅'],
'x1.i3':['唯一無二の場所での食事','在独特场景中用餐','특별한 장소에서의 식사'],
'x2.n':['ウェルネスと癒しのエスケープ','身心疗愈之旅','웰니스 & 회복의 휴식'],
'x2.s':['静けさの中で自分を取り戻す。','在静谧中重新联结自我。','고요 속에서 나를 되찾다.'],
'x2.l':['静かなリトリート、一人ひとりに合わせたウェルネス体験、卓越したスパを通して、自分自身とつながり直しましょう。','通过宁静的度假居所、个性化的身心疗愈体验与卓越的水疗，重新与自己联结。','고요한 리트리트와 맞춤형 웰니스 경험, 뛰어난 스파를 통해 자신과 다시 이어지세요.'],
'x2.i1':['プライベートスパの儀式','私人水疗仪式','프라이빗 스파 의식'],
'x2.i2':['朝日の中でのマインドフルな動き','日出时的正念运动','일출 속 마음챙김 움직임'],
'x2.i3':['自然の中の静かなリトリート','自然中的静谧度假','자연 속 고요한 리트리트'],
'x3.n':['ロマンスと祝祭','浪漫与庆典','로맨스 & 기념일'],
'x3.s':['親密なひとときを、丁寧に設計。','精心设计的亲密时刻。','세심하게 설계한 친밀한 순간.'],
'x3.l':['ハネムーン、記念日、人生の節目を、親密で丁寧に設計された体験とともに祝いましょう。','以亲密而精心设计的体验，庆祝蜜月、纪念日与人生的重要里程碑。','허니문과 기념일, 인생의 소중한 이정표를 친밀하고 세심하게 설계된 경험으로 축하하세요.'],
'x3.i1':['二人だけのキャンドルライトディナー','烛光双人晚餐','둘만의 캔들라이트 디너'],
'x3.i2':['事前に手配するサプライズ','提前安排的惊喜','미리 준비하는 서프라이즈'],
'x3.i3':['特別な日のためのプライベート空間','为特别时刻准备的私密空间','특별한 날을 위한 프라이빗 공간'],
'x4.n':['特別な滞在','非凡住宿','특별한 숙박'],
'x4.s':['個性で選んだホテルとヴィラ。','因独特个性而甄选的酒店与别墅。','개성으로 고른 호텔과 빌라.'],
'x4.l':['個性とおもてなしで選び抜いたブティックホテル、特別なリゾート、プライベートヴィラ、隠れ家をご紹介します。','探索因个性与待客之道而甄选的精品酒店、非凡度假村、私人别墅与隐秘居所。','개성과 환대를 기준으로 선별한 부티크 호텔, 특별한 리조트, 프라이빗 빌라, 숨겨진 휴식처를 만나 보세요.'],
'x4.i1':['ブティックホテル','精品酒店','부티크 호텔'],
'x4.i2':['プライベートヴィラ','私人别墅','프라이빗 빌라'],
'x4.i3':['特別な隠れ家','非凡的隐秘居所','특별한 휴식처'],
'x5.n':['プライベートアドベンチャー','私享探险','프라이빗 어드벤처'],
'x5.s':['空から、水上から、道から眺める景色。','从空中、水上与步道领略风景。','하늘과 물, 길 위에서 만나는 풍경.'],
'x5.l':['遊覧飛行、プライベートな自然ツアー、特別なアウトドアの冒険を通して、非凡な風景を探検しましょう。','通过观光飞行、私人自然之旅与难忘的户外探险，探索非凡风光。','유람 비행, 프라이빗 자연 탐방, 특별한 아웃도어 어드벤처로 놀라운 풍경을 탐험하세요.'],
'x5.i1':['遊覧飛行','观光飞行','유람 비행'],
'x5.i2':['プライベートな自然ツアー','私人自然之旅','프라이빗 자연 탐방'],
'x5.i3':['湖と火山をめぐる旅','湖泊与火山之旅','호수와 화산 여행'],
'x6.n':['文化と遺産','文化与遗产','문화 & 유산'],
'x6.s':['伝統を守り継ぐ人々との出会い。','结识传承传统的人们。','전통을 이어 가는 사람들을 만나다.'],
'x6.l':['プライベートな探訪、伝統工芸、意義深い文化交流を通して、土地の伝統とつながりましょう。','通过私人探访、传统手工艺与有意义的文化交流，与当地传统联结。','프라이빗 탐방과 전통 공예, 의미 있는 문화 교류로 현지 전통과 연결되세요.'],
'x6.i1':['名匠とのワークショップ','与工艺大师的工作坊','장인과 함께하는 워크숍'],
'x6.i2':['プライベート遺産ツアー','私人遗产之旅','프라이빗 유산 투어'],
'x6.i3':['現地ガイドとの対話','与当地向导交流','현지 가이드와의 대화'],
'x7.n':['ファミリー・多世代の旅','家庭与三代同游','가족 & 다세대 여행'],
'x7.s':['世代を超えて分かち合う思い出。','跨越世代共享的回忆。','세대를 넘어 나누는 추억.'],
'x7.l':['プライベートな冒険、文化の発見、特別な滞在を通して、世代を超える思い出をつくりましょう。','通过私享探险、文化发现与非凡住宿，创造跨越世代的回忆。','프라이빗 어드벤처와 문화 발견, 특별한 숙박으로 세대를 아우르는 추억을 만드세요.'],
'x7.i1':['どの世代にも無理のない旅程','适合各个年龄节奏的行程','모든 연령에 맞춘 여유로운 일정'],
'x7.i2':['みんなで楽しむプライベート体験','共享的私人体验','함께 즐기는 프라이빗 경험'],
'x7.i3':['家族みんなでくつろげる広い滞在','全家宽敞舒适的住宿','온 가족이 머무는 넉넉한 숙박'],
'b.title':['あなたの世界を、あなたの流儀で。','您的世界，您的方式。','당신의 세계, 당신의 방식.'],
'b.text':['同じ旅人は二人といません。旅もまた、そうであるべきです。AVIORAは、特別な滞在、プライベート体験、移動、そして心のこもった細部を備えた、オーダーメイドの旅程をつくります。','没有两位旅行者是相同的，他们的旅程也不应雷同。AVIORA 为您打造个性化行程，涵盖非凡住宿、私享体验、交通与用心的细节。','똑같은 여행자는 없습니다. 여행도 그래야 하지요. AVIORA는 특별한 숙박과 프라이빗 경험, 이동, 세심한 디테일을 담은 맞춤 일정을 만듭니다.'],
's1.t':['発見する','探索','발견'],
's1.d':['あなたの願い、好み、旅への思いをお聞きします。','我们倾听您的愿望、偏好与旅行期许。','당신의 바람과 취향, 여행에 대한 소망에 귀 기울입니다.'],
's2.t':['デザインする','设计','설계'],
's2.d':['あなたのビジョンを映した旅程をつくります。','我们打造体现您愿景的个性化行程。','당신의 비전을 담은 맞춤 일정을 만듭니다.'],
's3.t':['手配する','安排','준비'],
's3.d':['必要な要素を、細やかさと正確さをもって調整します。','我们细致精准地统筹各项要素。','필요한 모든 요소를 세심하고 정확하게 조율합니다.'],
's4.t':['体験する','体验','경험'],
's4.d':['非凡な場所と心に残る瞬間をお楽しみください。','尽情享受非凡之地与难忘时刻。','특별한 장소와 의미 있는 순간을 즐기세요.'],
'cel.title':['人生を、美しく祝う。','美好地庆祝人生。','삶을 아름답게 축하하세요.'],
'cel.text':['忘れられないハネムーンから節目の記念日、プライベートなグループの旅まで、人生の大切な場面を讃える体験をキュレーションします。','从难忘的蜜月到纪念日里程碑，再到私享团体假期，我们精心策划体验，礼敬人生中最有意义的时刻。','잊지 못할 허니문부터 뜻깊은 기념일, 프라이빗 그룹 여행까지, 삶의 가장 소중한 순간을 기리는 경험을 큐레이션합니다.'],
'cel1.t':['ハネムーンとロマンチックな旅','蜜月与浪漫之旅','허니문 & 로맨틱 여행'],
'cel1.d':['ロマンス、発見、忘れられないふたりの時間とともに、次の章を始めましょう。','以浪漫、探索与难忘的二人时光，开启人生新篇章。','로맨스와 발견, 잊지 못할 둘만의 순간으로 새로운 장을 시작하세요.'],
'cel2.t':['記念日と人生の節目','纪念日与人生里程碑','기념일 & 인생의 이정표'],
'cel2.d':['意義ある節目を、特別な場所で、心のこもった演出とともに祝いましょう。','在非凡之地，以用心的细节庆祝有意义的时刻。','뜻깊은 순간을 특별한 장소에서 세심한 배려와 함께 축하하세요.'],
'cel3.t':['プライベートグループの旅','私享团体假期','프라이빗 그룹 여행'],
'cel3.d':['特別な旅で、家族や友人と絆を深めましょう。','在专属旅程中，与家人朋友重拾亲密时光。','특별한 여행으로 가족, 친구와 다시 가까워지세요.'],
'cel.cta':['お祝いをデザインする','设计您的庆典','나만의 기념 여행 만들기'],
'st.title':['世界に着想を得て、グアテマラに根ざして。','汲取世界灵感，扎根危地马拉。','세계에서 영감을 얻고, 과테말라에 뿌리를 두다.'],
'st.text':['AVIORAは、意味のある旅、非凡な場所への情熱と、記憶に残る体験には丁寧なデザインが必要だという信念から生まれました。私たちにとって旅とは、新しい視点に出会い、文化とつながり、瞬間を祝い、いつまでも残る思い出をつくる機会です。','AVIORA 源于对有意义的旅行与非凡之地的热爱，以及对难忘体验值得用心设计的信念。在我们看来，旅行是发现新视角、联结多元文化、庆祝美好时刻并创造长久回忆的机会。','AVIORA는 의미 있는 여행과 특별한 장소에 대한 열정, 그리고 기억에 남는 경험에는 세심한 설계가 필요하다는 믿음에서 시작되었습니다. 우리에게 여행은 새로운 시각을 발견하고, 문화와 연결되고, 순간을 축하하며, 오래 남는 추억을 만드는 기회입니다.'],
'st.close':['AVIORAでは、すべての旅が一つの物語から始まります。あなたの物語づくりをお手伝いさせてください。','在 AVIORA，每一段旅程都从一个故事开始。让我们帮助您书写属于您的故事。','AVIORA의 모든 여행은 하나의 이야기에서 시작됩니다. 당신의 이야기를 함께 만들어 가겠습니다.'],
'gal.title':['ひとかけらの情景','几帧掠影','몇 장의 풍경'],
'p.title':['非凡な旅は、ここから始まります。','您的非凡旅程，从这里开始。','특별한 여행이 여기서 시작됩니다.'],
'p.text':['訪れてみたい場所や、心を動かされる体験をお聞かせください。','告诉我们您梦想探索的地方，以及激发您灵感的体验。','발견하고 싶은 장소와 영감을 주는 경험을 들려주세요.'],
'f.name':['お名前','姓名','성함'],
'f.email':['メールアドレス','电子邮箱','이메일'],
'f.country':['お住まいの国','居住国家','거주 국가'],
'f.phone':['電話番号（任意）','电话（选填）','전화번호(선택)'],
'f.dest':['ご希望の目的地','心仪目的地','희망 여행지'],
'f.open':['まだ決めていません','尚未决定','아직 정하지 않음'],
'f.dates':['おおよその日程','大致日期','대략적인 일정'],
'f.dates.ph':['例：2027年3月、10日間','例如：2027年3月，10天','예: 2027년 3월, 10일'],
'f.trav':['旅行人数','出行人数','여행 인원'],
'f.type':['体験の種類','体验类型','경험 유형'],
'f.budget':['ご予算の目安（合計・米ドル）','预计总预算（美元）','예상 총 예산(USD)'],
'f.msg':['詳しくお聞かせください','告诉我们更多','더 자세히 알려 주세요'],
'f.msg.ph':['ご旅行の目的、興味、同行者など…','旅行场合、兴趣、同行人员……','여행 계기, 관심사, 동행인 등…'],
'f.consent':['プライバシーポリシーに同意し、お問い合わせについて連絡を受けることに同意します。','我同意隐私政策，并同意就我的咨询与我联系。','개인정보 처리방침에 동의하며 문의와 관련해 연락받는 데 동의합니다.'],
'f.submit':['旅を始める','开启我的旅程','내 여행 시작하기'],
'f.sending':['送信中…','发送中……','전송 중…'],
'f.sel':['選択してください…','请选择……','선택하세요…'],
'f.err.req':['この項目を入力してください。','请填写此项。','이 항목을 입력해 주세요.'],
'f.err.email':['有効なメールアドレスを入力してください。','请输入有效的电子邮箱。','올바른 이메일 주소를 입력해 주세요.'],
'f.err.consent':['続けるには同意が必要です。','请先同意后继续。','계속하려면 동의가 필요합니다.'],
'f.thanks.t':['ありがとうございます。','谢谢您。','감사합니다.'],
'f.thanks':['AVIORAへお問い合わせいただきありがとうございます。あなたの旅への思いをお聞きできるのを楽しみにしています。担当チームより近日中にご連絡いたします。','感谢您联系 AVIORA。我们期待了解您的旅行愿望。团队将很快与您联系。','AVIORA에 문의해 주셔서 감사합니다. 당신의 여행에 대한 바람을 들려주실 날을 기다리겠습니다. 담당 팀이 곧 연락드리겠습니다.'],
'f.again':['別のお問い合わせを送る','再提交一份咨询','다른 문의 보내기'],
'c.or':['お話しになりたい場合は？','更想直接沟通？','직접 이야기하고 싶으신가요?'],
'c.wa.t':['WhatsAppで相談する','通过 WhatsApp 联系','WhatsApp으로 문의'],
'c.wa.msg':['こんにちは、AVIORAさん。旅行を計画したいです。','您好 AVIORA，我想规划一次旅行。','안녕하세요 AVIORA, 여행을 계획하고 싶습니다.'],
'c.cal':['通話を予約する','预约通话','통화 예약'],
'c.cal.soon':['予約リンクは近日公開予定です。それまでの間は、お問い合わせフォームの送信か折り返し電話をご利用ください。','预约链接即将开放。在此期间，请提交咨询或申请回电。','예약 링크는 곧 열릴 예정입니다. 그동안 문의를 보내시거나 전화 요청을 이용해 주세요.'],
'c.call':['折り返し電話を希望する','申请回电','전화 요청'],
'c.call.phone':['電話番号','电话号码','전화번호'],
'c.call.time':['ご希望の時間帯','方便通话的时间','통화 가능 시간'],
'c.call.send':['電話を依頼する','申请回电','전화 요청하기'],
'c.call.ok':['折り返しを承りました。ご希望の時間帯にご連絡します。','已收到回电申请，我们将在您选择的时间联系您。','전화 요청이 접수되었습니다. 선택하신 시간에 연락드리겠습니다.'],
't.am':['午前','上午','오전'],
't.pm':['午後','下午','오후'],
't.eve':['夜','晚上','저녁'],
'faq.title':['よくあるご質問','常见问题','자주 묻는 질문'],
'q1':['オーダーメイドの旅程は可能ですか？','你们提供定制行程吗？','맞춤 일정을 제공하나요?'],
'a1':['はい。すべての旅程は、旅行者の好み、日程、関心に合わせて仕立てます。','是的。每份行程都会根据旅行者的偏好、日期与兴趣量身定制。','네. 모든 일정은 여행자의 취향, 일정, 관심사에 맞춰 구성합니다.'],
'q2':['グアテマラ以外の旅も手配できますか？','你们能安排危地马拉以外的旅行吗？','과테말라 밖 여행도 준비해 주나요?'],
'a2':['はい。厳選した目的地と旅行パートナーを通じて手配します（確認が前提となります）。','可以，通过精选目的地与旅行合作伙伴安排，以最终确认为准。','네, 엄선한 여행지와 여행 파트너를 통해 준비하며 확정 여부에 따라 진행됩니다.'],
'q3':['どのくらい前にお問い合わせすればよいですか？','应该提前多久咨询？','얼마나 일찍 문의해야 하나요?'],
'a3':['できるだけお早めに。特に繁忙期や特別な記念日の旅行はお早めのご相談をおすすめします。','越早越好，尤其是旺季和特殊场合。','가능한 한 일찍 문의해 주세요. 특히 성수기나 특별한 기념일에는 더욱 그렇습니다.'],
'q4':['体験はプライベートですか？','体验是私享的吗？','경험은 프라이빗한가요?'],
'a4':['プライベートな手配を専門としています（選択するサービスと空き状況によります）。','我们专注于私享安排，具体视所选服务与可用情况而定。','프라이빗 서비스를 전문으로 하며, 선택한 서비스와 이용 가능 여부에 따라 달라질 수 있습니다.'],
'q5':['どうやって始めればよいですか？','如何开始？','어떻게 시작하나요?'],
'a5':['お問い合わせフォームにご記入ください。次のステップについてご連絡します。','请填写咨询表单，我们会就后续步骤与您联系。','문의 양식을 작성해 주시면 다음 단계에 대해 연락드리겠습니다.'],
'ft.tag':['グアテマラに根ざし、世界に着想を得て。','扎根危地马拉，汲取世界灵感。','과테말라에 뿌리를 두고, 세계에서 영감을 얻다.'],
'ft.nav':['メニュー','探索','둘러보기'],
'ft.contact':['お問い合わせ','联系','문의'],
'ft.email':['メール · [公式メール]','邮箱 · [官方邮箱]','이메일 · [공식 이메일]'],
'ft.phone':['[電話番号]','[电话]','[전화번호]'],
'ft.ig':['[アカウント]','[账号]','[계정]'],
'ft.priv':['プライバシーポリシー','隐私政策','개인정보 처리방침'],
'ft.terms':['利用規約','条款','이용약관'],
'ft.cookie':['クッキーポリシー','Cookie 政策','쿠키 정책'],
'meta.title':['AVIORA | ラグジュアリートラベル＆オーダーメイド体験','AVIORA | 奢华旅行与私人定制体验','AVIORA | 럭셔리 트래블 & 맞춤 경험'],
'meta.desc':['AVIORAはプライベートなラグジュアリートラベルとオーダーメイド体験をデザインします。グアテマラに根ざし、世界に着想を得て。','AVIORA 设计私享奢华旅程与定制体验。扎根危地马拉，汲取世界灵感。','AVIORA는 프라이빗 럭셔리 여행과 맞춤 경험을 설계합니다. 과테말라에 뿌리를 두고 세계에서 영감을 얻습니다.']
};
var lang = 'en';
function t(k){ if(lang === 'it' && T3[k]) return T3[k]; var i = LANGS.indexOf(lang); if(i >= 4 && lang !== 'it'){ var b = T2[k]; if(b && b[i-4]) return b[i-4]; } var a = T[k]; if(!a) return k; return a[i] || a[0]; }

/* ---------- helpers ---------- */
function $(s,r){ return (r||document).querySelector(s); }
function $$(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); }
var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
var hasG = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
if(hasG) gsap.registerPlugin(ScrollTrigger);
function el(tag, cls, html){ var e = document.createElement(tag); if(cls) e.className = cls; if(html != null) e.innerHTML = html; return e; }
function svgEl(tag, attrs){ var e = document.createElementNS('http://www.w3.org/2000/svg', tag); for(var k in attrs) e.setAttribute(k, attrs[k]); return e; }

/* images */
$$('img[data-img]').forEach(function(i){ i.src = IMG[i.dataset.img]; });

/* ---------- Lenis smooth scroll ---------- */
var lenis = null;
if(typeof Lenis !== 'undefined' && !reduce){
  try{
    lenis = new Lenis({duration:1.15, easing:function(x){ return Math.min(1, 1.001 - Math.pow(2, -10*x)); }});
    if(hasG){ lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(function(time){ lenis.raf(time*1000); }); gsap.ticker.lagSmoothing(0); }
    else { (function raf(time){ lenis.raf(time); requestAnimationFrame(raf); })(0); }
  }catch(e){ lenis = null; }
}
function lockScroll(on){ if(lenis){ on ? lenis.stop() : lenis.start(); } document.documentElement.style.overflow = on ? 'hidden' : ''; }
function goto(id){
  var y = 0;
  if(id !== 'home'){ var target = document.getElementById(id); if(!target) return; y = target.getBoundingClientRect().top + window.scrollY; }
  if(lenis) lenis.scrollTo(y, {duration:1.6}); else window.scrollTo({top:y, behavior: reduce ? 'auto' : 'smooth'});
}
document.addEventListener('click', function(e){
  var a = e.target.closest('a[href^="#"]'); if(!a) return;
  var id = a.getAttribute('href').slice(1); if(!id) return;
  e.preventDefault();
  if(a.dataset.prefill){ prefill({type: a.dataset.prefill}); }
  document.body.classList.remove('menu'); $('#burger').setAttribute('aria-expanded','false'); $('#mnav').setAttribute('aria-hidden','true'); closeAll(true);
  setTimeout(function(){ goto(id); }, document.body.classList.contains('menu') ? 300 : 0);
});

/* ---------- i18n ---------- */
function applyI18n(){
  $$('[data-i]').forEach(function(n){ n.textContent = t(n.dataset.i); });
  $$('[data-ia]').forEach(function(n){ n.setAttribute('aria-label', t(n.dataset.ia)); });
  $$('[data-ip]').forEach(function(n){ n.setAttribute('placeholder', t(n.dataset.ip)); });
  document.title = t('meta.title');
  var md = $('meta[name="description"]'); if(md) md.setAttribute('content', t('meta.desc'));
  var og = $('meta[property="og:title"]'); if(og) og.setAttribute('content', t('meta.title'));
  document.documentElement.lang = ({zh:'zh-CN'})[lang] || lang; document.documentElement.classList.toggle('cjk', ['ja','zh','ko'].indexOf(lang) >= 0);
  $('#langCode').textContent = CODES[lang];
  $('#langFlag').firstElementChild.setAttribute('href', '#fl-' + lang);
  $$('#langMenu button').forEach(function(b){ b.setAttribute('aria-selected', b.dataset.lang === lang ? 'true':'false'); });
  $$('#mnavLang button').forEach(function(b){ b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true':'false'); });
  $$('[data-err]').forEach(function(n){ n.textContent = t('f.err.' + n.dataset.err); });
}
function setLang(l, silent){
  if(ENABLED.indexOf(l) < 0 || l === lang) { closeLangMenu(); return; }
  lang = l;
  try{ localStorage.setItem('aviora-lang', l); }catch(e){}
  var main = $('#main'); main.style.transition = 'opacity .18s'; main.style.opacity = 0;
  setTimeout(function(){
    applyI18n(); renderAll();
    main.style.opacity = 1;
    if(hasG) setTimeout(function(){ ScrollTrigger.refresh(); }, 120);
  }, silent ? 0 : 180);
  closeLangMenu();
}
function closeLangMenu(){ $('#lang').classList.remove('open'); $('#langBtn').setAttribute('aria-expanded','false'); }
$('#langBtn').addEventListener('click', function(e){ e.stopPropagation(); var o = $('#lang').classList.toggle('open'); this.setAttribute('aria-expanded', o ? 'true':'false'); if(o){ var s = $('#langMenu [aria-selected="true"]'); if(s) s.focus(); } });
$$('#langMenu button, #mnavLang button').forEach(function(b){ b.addEventListener('click', function(){ setLang(b.dataset.lang); }); });
document.addEventListener('click', function(e){ if(!e.target.closest('#lang')) closeLangMenu(); });
$('#langMenu').addEventListener('keydown', function(e){
  var items = $$('#langMenu button'), i = items.indexOf(document.activeElement);
  if(e.key === 'ArrowDown'){ e.preventDefault(); items[(i+1) % items.length].focus(); }
  if(e.key === 'ArrowUp'){ e.preventDefault(); items[(i-1+items.length) % items.length].focus(); }
});

/* ---------- Header behaviour ---------- */
var hdr = $('#hdr'), lastY = 0, fab = $('#fab');
function onScroll(){
  var y = window.scrollY;
  hdr.classList.toggle('solid', y > 60);
  document.body.classList.toggle('solid', y > 60);
  var menuOpen = document.body.classList.contains('menu');
  hdr.classList.toggle('hide', y > lastY && y > 480 && !menuOpen && !$('#lang').classList.contains('open'));
  lastY = y;
  var plan = $('#plan').getBoundingClientRect();
  var inPlan = plan.top < window.innerHeight * 0.6;
  fab.classList.toggle('show', y > window.innerHeight * 1.2 && !inPlan);
  $('#totop').classList.toggle('show', y > window.innerHeight * 0.9);
  var secs = ['destinations','experiences','bespoke','celebrations','story'], cur = '';
  secs.forEach(function(id){ var r = document.getElementById(id).getBoundingClientRect(); if(r.top < window.innerHeight * 0.4 && r.bottom > window.innerHeight * 0.4) cur = id; });
  if(cur === 'destinations' || $('#world').getBoundingClientRect().top < window.innerHeight*.4 && $('#world').getBoundingClientRect().bottom > window.innerHeight*.4) cur = 'destinations';
  $$('#nav a').forEach(function(a){ a.classList.toggle('on', a.getAttribute('href') === '#' + cur); });
  tlUpdate();
}
window.addEventListener('scroll', onScroll, {passive:true});
$('#totop').addEventListener('click', function(){ goto('home'); this.blur(); });
$('#burger').addEventListener('click', function(){
  var o = document.body.classList.toggle('menu');
  this.setAttribute('aria-expanded', o ? 'true':'false'); $('#mnav').setAttribute('aria-hidden', o ? 'false':'true'); lockScroll(o);
});

/* ---------- Guatemala map ---------- */
var GT = [
  {id:'ant',img:'antigua',lon:-90.73,lat:14.56,side:'r'},
  {id:'atit',img:'atitlan',lon:-91.20,lat:14.69,side:'l'},
  {id:'pet',img:'tikal',lon:-89.62,lat:17.22,side:'r'},
  {id:'pac',img:'pacific',lon:-90.47,lat:13.93,side:'r'}
];
var GT_OUT = [[-92.23,14.53],[-92.2,14.85],[-92.14,15.07],[-91.73,16.07],[-90.98,17.25],[-90.99,17.82],[-89.15,17.82],[-89.15,15.9],[-88.93,15.89],[-88.23,15.73],[-88.4,15.4],[-88.95,15.15],[-89.2,14.85],[-89.15,14.6],[-89.36,14.43],[-89.58,14.38],[-90.1,13.74],[-90.6,13.85],[-91.2,13.95],[-91.9,14.25]];
function gtP(lon,lat){ return [(lon + 92.4) * 132 * 0.963, (17.95 - lat) * 132]; }
function inPoly(x,y,p){ var c = false; for(var i=0,j=p.length-1;i<p.length;j=i++){ var xi=p[i][0],yi=p[i][1],xj=p[j][0],yj=p[j][1]; if(((yi>y)!==(yj>y)) && (x < (xj-xi)*(y-yi)/(yj-yi)+xi)) c = !c; } return c; }
var gtActive = 'ant';
/* Real outline of Guatemala (Natural Earth 1:10m, public domain), same dotted style as the world map. */
var GT_REAL = [[-92.246,14.546],[-92.226,14.549],[-92.208,14.571],[-92.161,14.683],[-92.192,14.835],[-92.155,14.901],[-92.154,14.996],[-92.142,15.007],[-92.104,15.018],[-92.074,15.074],[-92.203,15.237],[-92.211,15.272],[-91.74,16.061],[-91.724,16.069],[-90.486,16.071],[-90.448,16.079],[-90.437,16.099],[-90.435,16.107],[-90.456,16.1],[-90.459,16.117],[-90.436,16.136],[-90.448,16.154],[-90.426,16.164],[-90.462,16.189],[-90.466,16.208],[-90.459,16.222],[-90.435,16.236],[-90.458,16.249],[-90.459,16.259],[-90.448,16.271],[-90.428,16.264],[-90.441,16.285],[-90.434,16.292],[-90.414,16.288],[-90.414,16.298],[-90.445,16.308],[-90.405,16.332],[-90.399,16.348],[-90.407,16.36],[-90.421,16.353],[-90.418,16.367],[-90.38,16.368],[-90.391,16.386],[-90.395,16.419],[-90.421,16.415],[-90.476,16.431],[-90.482,16.456],[-90.498,16.468],[-90.509,16.471],[-90.533,16.46],[-90.544,16.49],[-90.585,16.48],[-90.633,16.483],[-90.612,16.508],[-90.613,16.518],[-90.648,16.53],[-90.634,16.592],[-90.647,16.6],[-90.667,16.587],[-90.654,16.617],[-90.668,16.653],[-90.735,16.747],[-90.8,16.787],[-90.797,16.805],[-90.811,16.813],[-90.832,16.805],[-90.919,16.836],[-90.969,16.874],[-90.953,16.891],[-90.955,16.899],[-90.986,16.901],[-90.983,16.879],[-90.993,16.874],[-91.017,16.895],[-91.055,16.908],[-91.067,16.918],[-91.077,16.95],[-91.112,16.99],[-91.126,17.024],[-91.171,17.028],[-91.207,17.065],[-91.23,17.114],[-91.259,17.124],[-91.28,17.18],[-91.291,17.189],[-91.365,17.19],[-91.373,17.214],[-91.443,17.238],[-91.438,17.254],[-91.431,17.255],[-90.992,17.252],[-90.991,17.802],[-90.983,17.811],[-90.962,17.816],[-89.16,17.814],[-89.149,17.036],[-89.184,16.496],[-89.236,15.894],[-89.228,15.881],[-89.177,15.9],[-89.04,15.902],[-88.952,15.88],[-88.914,15.894],[-88.866,15.86],[-88.832,15.869],[-88.787,15.859],[-88.753,15.84],[-88.749,15.819],[-88.727,15.815],[-88.626,15.754],[-88.636,15.702],[-88.609,15.702],[-88.595,15.715],[-88.605,15.743],[-88.582,15.745],[-88.574,15.77],[-88.55,15.798],[-88.558,15.853],[-88.55,15.853],[-88.55,15.839],[-88.532,15.847],[-88.503,15.841],[-88.489,15.847],[-88.543,15.885],[-88.565,15.915],[-88.608,15.938],[-88.62,15.953],[-88.605,15.97],[-88.55,15.942],[-88.448,15.859],[-88.345,15.812],[-88.256,15.74],[-88.221,15.726],[-88.233,15.721],[-88.242,15.688],[-88.248,15.696],[-88.296,15.675],[-88.317,15.675],[-88.353,15.617],[-88.399,15.573],[-88.973,15.14],[-89.11,15.091],[-89.161,15.06],[-89.189,14.996],[-89.169,14.978],[-89.169,14.952],[-89.199,14.9],[-89.231,14.867],[-89.232,14.849],[-89.189,14.783],[-89.171,14.739],[-89.145,14.708],[-89.145,14.683],[-89.159,14.666],[-89.16,14.581],[-89.172,14.57],[-89.221,14.58],[-89.246,14.573],[-89.323,14.487],[-89.356,14.475],[-89.364,14.447],[-89.362,14.415],[-89.39,14.436],[-89.397,14.426],[-89.399,14.445],[-89.431,14.419],[-89.447,14.416],[-89.485,14.427],[-89.503,14.42],[-89.541,14.382],[-89.544,14.4],[-89.555,14.411],[-89.57,14.412],[-89.584,14.402],[-89.591,14.386],[-89.576,14.353],[-89.598,14.328],[-89.592,14.314],[-89.559,14.303],[-89.545,14.262],[-89.525,14.247],[-89.525,14.232],[-89.638,14.201],[-89.69,14.17],[-89.753,14.075],[-89.748,14.038],[-89.762,14.03],[-89.803,14.055],[-89.836,14.059],[-89.891,14.036],[-90.023,13.937],[-90.047,13.894],[-90.087,13.87],[-90.107,13.844],[-90.114,13.796],[-90.098,13.731],[-90.401,13.859],[-90.5,13.895],[-90.58,13.913],[-90.707,13.929],[-90.91,13.911],[-91.044,13.914],[-91.166,13.927],[-91.316,13.956],[-91.552,14.057],[-91.763,14.18],[-91.908,14.284],[-92.05,14.408]];
function buildGtMap(){
  var svg = $('#gtMap'); svg.innerHTML = '';
  var d = '';
  for(var lat=17.9; lat>=13.7; lat-=0.075) for(var lon=-92.4; lon<=-88.1; lon+=0.075){ if(inPoly(lon,lat,GT_REAL)){ var p = gtP(lon,lat); d += 'M' + p[0].toFixed(1) + ' ' + p[1].toFixed(1) + 'h.01'; } }
  svg.appendChild(svgEl('path',{d:d,'class':'g-dots'}));
  svg.appendChild(svgEl('path',{d:'M' + GT_REAL.map(function(q){ var p = gtP(q[0],q[1]); return p[0].toFixed(1)+' '+p[1].toFixed(1); }).join('L') + 'Z','class':'g-out'}));
  GT.forEach(function(g){
    var p = gtP(g.lon,g.lat), grp = svgEl('g',{'class':'pin','data-id':g.id,tabindex:'0',role:'button','transform':'translate('+p[0].toFixed(1)+' '+p[1].toFixed(1)+')'});
    grp.appendChild(svgEl('circle',{'class':'hit',r:'26'}));
    grp.appendChild(svgEl('circle',{'class':'halo',r:'10'}));
    grp.appendChild(svgEl('circle',{'class':'core',r:'6'}));
    var tx = svgEl('text',{'class':'lab',x: g.side === 'l' ? '-16' : '16', y:'6','text-anchor': g.side === 'l' ? 'end':'start'});
    tx.setAttribute('data-k','d.' + g.id + '.n'); grp.appendChild(tx);
    ['pointerenter','focus','click'].forEach(function(ev){ grp.addEventListener(ev, function(){ setGt(g.id); }); });
    grp.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); setGt(g.id); } });
    svg.appendChild(grp);
  });
  svg.setAttribute('aria-label', t('gt.map'));
}
function renderGtTexts(){
  $$('#gtMap .lab').forEach(function(n){ n.textContent = t(n.dataset.k); });
  var tabs = $('#gtTabs'); tabs.innerHTML = '';
  GT.forEach(function(g){ var b = el('button', '', t('d.' + g.id + '.n')); b.type = 'button'; b.setAttribute('aria-pressed', g.id === gtActive ? 'true':'false'); b.addEventListener('click', function(){ setGt(g.id); }); tabs.appendChild(b); });
  $$('#gtMap .pin').forEach(function(p){ p.classList.toggle('on', p.dataset.id === gtActive); p.setAttribute('aria-label', t('d.' + p.dataset.id + '.n')); });
}
function renderGtCard(anim){
  var g = GT.filter(function(x){ return x.id === gtActive; })[0], c = $('#gtCard');
  c.innerHTML = '<div class="ph"><img alt="" src="' + IMG[g.img] + '"></div><div class="tx"><span class="tag">' + t('d.'+g.id+'.t') + '</span><h3>' + t('d.'+g.id+'.n') + '</h3><p>' + t('d.'+g.id+'.x') + '</p><span class="inc-h">' + t('gt.inc') + '</span><ul class="inc"><li>' + t('d.'+g.id+'.e1') + '</li><li>' + t('d.'+g.id+'.e2') + '</li><li>' + t('d.'+g.id+'.e3') + '</li></ul><a class="btn btn-ink btn-sm" href="#plan" data-dest="' + g.id + '">' + t('gt.cta') + '</a></div>';
  if(anim){ c.classList.remove('swap'); void c.offsetWidth; c.classList.add('swap'); }
  $('a[data-dest]', c).addEventListener('click', function(){ prefill({dest: g.id}); });
}
function setGt(id){ if(id === gtActive) return; gtActive = id; renderGtTexts(); renderGtCard(true); }

/* ---------- World map ---------- */
var LAND = [
 [[-168,66],[-160,70],[-140,70],[-125,70],[-95,72],[-80,70],[-62,60],[-55,52],[-67,45],[-76,38],[-81,31],[-80,25],[-84,30],[-90,30],[-97,27],[-97,21],[-92,18.5],[-88,21],[-87,16],[-83,10],[-79,8.5],[-83,8],[-86,12],[-92,14.5],[-97,16],[-105,20],[-109,26],[-115,31],[-117,33],[-121,35],[-124,40],[-124,48],[-130,55],[-140,60],[-150,61],[-158,57],[-165,62]],
 [[-55,60],[-45,60],[-20,70],[-20,82],[-60,82],[-72,78],[-55,70]],
 [[-79,8.5],[-72,12],[-62,10.5],[-52,5],[-50,0],[-35,-5],[-35,-9],[-39,-15],[-41,-22],[-48,-26],[-53,-34],[-58,-38],[-62,-39],[-65,-45],[-68,-52],[-70,-54],[-74,-50],[-73,-40],[-71,-30],[-70,-18],[-76,-14],[-81,-5],[-80,0],[-78,5]],
 [[-10,36],[-9,43],[-1,46],[-4,48],[2,51],[5,53],[8,55],[9,57],[11,58],[5,62],[10,64],[15,69],[25,71],[30,70],[40,67],[42,60],[35,55],[38,47],[30,45],[28,41],[26,40],[23,37],[20,40],[19,42],[15,44],[13.5,45.5],[12.5,44],[14,42],[16,41],[18.5,40.2],[16,38],[15.7,40],[12,41.5],[10,43.5],[8.5,44.4],[6.5,43.2],[3,43],[0,39],[-5,36]],
 [[-5,50],[1,51],[2,53],[-2,56],[-3,58.5],[-6,58],[-5,54],[-3,53],[-5,51.5]],
 [[-17,21],[-13,28],[-6,36],[10,37],[11,33],[20,31],[32,31],[34,28],[38,21],[43,12],[51,12],[46,5],[40,-3],[40,-15],[35,-24],[32,-29],[27,-34],[20,-35],[18,-30],[12,-17],[13,-8],[9,-1],[9,4],[5,5],[-8,4.5],[-13,8],[-17,14]],
 [[28,41],[36,36.5],[35,32],[34.5,28],[39,21],[43,13],[52,16],[59,22.5],[56,26],[51,25],[50,30],[57,26],[62,25],[67,24.5],[72,21],[73,16],[77,8],[80,13],[80,16],[87,21.5],[92,22],[94,17],[98,16],[98,8],[101,2],[104,1.5],[101,6],[100,13],[103,10],[105,9],[107,11],[109,12],[106,19],[109,21.5],[113,22],[117,23.5],[121,28],[122,31],[120,35],[122,37],[119,39],[122,40.5],[125,40],[126,35],[129,35.5],[129.5,41],[135,43],[141,52],[137,54],[143,59],[155,59.5],[163,62],[179,65],[170,69.5],[150,71],[130,72],[110,77],[100,77],[80,73],[70,73],[60,69],[50,68],[42,67],[40,60],[35,55],[38,47],[34,45]],
 [[130,31],[132,34],[135,34.5],[140,35],[141,38],[142,41.5],[140,41],[139.5,38],[136.5,37],[133,35.5],[131,34.5]],
 [[140,42],[145,43.5],[142,45.5]],
 [[114,-22],[122,-18],[130,-12],[137,-12],[142,-11],[146,-19],[153,-26],[151,-34],[147,-38],[141,-38],[135,-34],[131,-31.5],[124,-33.5],[115,-34],[114,-26]],
 [[109,2],[111,1.5],[117,7],[119,5],[117,1],[116,-4],[110,-3]],
 [[95,5.5],[98,4],[104,-1.5],[106,-6],[102,-4],[97,1]],
 [[44,-25],[47,-25],[50,-15],[49,-12],[44,-17]]
];
var PLACES = [
  {id:'gt',lon:-90.5,lat:14.6,cat:'home',img:'atitlan',lab:'r'},
  {id:'it',lon:12.5,lat:42.8,cat:'eu',img:'amalfi',lab:'l'},
  {id:'jo',lon:36.2,lat:30.8,cat:'me',img:null,lab:'r'},
  {id:'ea',lon:36,lat:-4,cat:'af',img:null,lab:'r'},
  {id:'mv',lon:73.5,lat:3.2,cat:'is',img:null,lab:'r'},
  {id:'jp',lon:138,lat:36,cat:'as',img:null,lab:'l'}
];
function wP(lon,lat){ return [(lon + 180) / 360 * 1000, (80 - lat) / 138 * 390]; }
var wActive = 'it', wFilter = 'all';
function buildWorld(){
  var svg = $('#wMap'); svg.innerHTML = '';
  var d = '';
  for(var lat=80; lat>=-58; lat-=2.3) for(var lon=-180; lon<=180; lon+=2.3){
    for(var k=0;k<LAND.length;k++){ if(inPoly(lon,lat,LAND[k])){ var p = wP(lon,lat); d += 'M' + p[0].toFixed(1) + ' ' + p[1].toFixed(1) + 'h.01'; break; } }
  }
  svg.appendChild(svgEl('path',{d:d,'class':'w-dots'}));
  PLACES.forEach(function(pl){
    var p = wP(pl.lon,pl.lat), g = svgEl('g',{'class':'wpin' + (pl.cat === 'home' ? ' home':''),'data-id':pl.id,tabindex:'0',role:'button',transform:'translate('+p[0].toFixed(1)+' '+p[1].toFixed(1)+')'});
    g.appendChild(svgEl('circle',{'class':'hit',r:'20'}));
    g.appendChild(svgEl('circle',{'class':'halo',r:'8'}));
    g.appendChild(svgEl('circle',{'class':'core',r:'5'}));
    var tx = svgEl('text',{'class':'lab',x: pl.lab === 'l' ? '-12':'12',y:'6','text-anchor': pl.lab === 'l' ? 'end':'start'}); tx.setAttribute('data-k','w.' + pl.id + '.n'); g.appendChild(tx);
    ['pointerenter','focus','click'].forEach(function(ev){ g.addEventListener(ev, function(){ setW(pl.id); }); });
    g.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); setW(pl.id); } });
    svg.appendChild(g);
  });
}
function renderWorldTexts(){
  var chips = $('#wChips'); chips.innerHTML = '';
  ['all','eu','as','af','me','is'].forEach(function(c){ var b = el('button','',t('w.' + c)); b.type = 'button'; b.setAttribute('aria-pressed', c === wFilter ? 'true':'false'); b.addEventListener('click', function(){ wFilter = c; applyWFilter(); renderWorldTexts(); }); chips.appendChild(b); });
  $$('#wMap .lab').forEach(function(n){ n.textContent = t(n.dataset.k); });
  $$('#wMap .wpin').forEach(function(p){ p.classList.toggle('on', p.dataset.id === wActive); p.setAttribute('aria-label', t('w.' + p.dataset.id + '.n')); });
  $('#wMap').setAttribute('aria-label', t('w.map'));
}
function applyWFilter(){
  $$('#wMap .wpin').forEach(function(p){ var pl = PLACES.filter(function(x){ return x.id === p.dataset.id; })[0]; p.classList.toggle('off', !(wFilter === 'all' || pl.cat === 'home' || pl.cat === wFilter)); });
  var cur = PLACES.filter(function(x){ return x.id === wActive; })[0];
  if(!(wFilter === 'all' || cur.cat === 'home' || cur.cat === wFilter)){ var first = PLACES.filter(function(x){ return x.cat === wFilter; })[0]; if(first){ wActive = first.id; renderWCard(true); } }
}
function renderWCard(anim){
  var pl = PLACES.filter(function(x){ return x.id === wActive; })[0], c = $('#wCard'), home = pl.cat === 'home';
  var ph = pl.img ? '<img alt="" src="' + IMG[pl.img] + '">' : '<div class="plate"><span>' + t('w.' + pl.cat) + '</span></div>';
  c.innerHTML = '<div class="ph">' + ph + '</div><div class="tx"><h3>' + t('w.' + pl.id + '.n') + '</h3><p>' + t('w.' + pl.id + '.x') + '</p>' + (home ? '' : '<span class="req">' + t('w.req') + '</span><br>') + '<a class="btn btn-solid" href="' + (home ? '#destinations' : '#plan') + '">' + (home ? t('w.gt.cta') : t('gt.cta')) + '</a></div>';
  if(!home) $('a.btn', c).addEventListener('click', function(){ prefill({dest: pl.id}); });
  if(anim){ c.classList.remove('swap'); void c.offsetWidth; c.classList.add('swap'); }
}
function setW(id){ if(id === wActive) return; wActive = id; renderWorldTexts(); renderWCard(true); }

/* ---------- Experiences carousel + modal ---------- */
var XP = [{id:'x1',img:'dinner'},{id:'x2',img:'lounge'},{id:'x3',img:'candles'},{id:'x4',img:'pool'},{id:'x5',img:'lake'},{id:'x6',img:'weaving'},{id:'x7',img:'corridor'}];
function renderXP(){
  var tr = $('#track'); tr.innerHTML = '';
  XP.forEach(function(x,i){
    var b = el('button','xc'); b.type = 'button'; b.dataset.cursor = 'x.open';
    b.innerHTML = '<img alt="" draggable="false" src="' + IMG[x.img] + '" style="object-position:50% 50%"><div class="in"><h3>' + t(x.id + '.n') + '</h3><p>' + t(x.id + '.s') + '</p></div>';
    b.addEventListener('click', function(){ if(dragMoved) return; openXM(i); });
    tr.appendChild(b);
  });
  if(xmIndex >= 0) fillXM();
}
var dragMoved = false;
(function(){
  var tr = $('#track'), down = false, sx = 0, sl = 0;
  tr.addEventListener('pointerdown', function(e){ if(e.pointerType !== 'mouse') return; down = true; dragMoved = false; sx = e.clientX; sl = tr.scrollLeft; });
  window.addEventListener('pointermove', function(e){ if(!down) return; var dx = e.clientX - sx; if(Math.abs(dx) > 6){ dragMoved = true; tr.classList.add('drag'); } if(dragMoved) tr.scrollLeft = sl - dx; });
  window.addEventListener('pointerup', function(){ if(!down) return; down = false; tr.classList.remove('drag'); setTimeout(function(){ dragMoved = false; }, 30); });
  function step(dir){ var c = $('.xc', tr); var w = c ? c.getBoundingClientRect().width + 20 : 320; tr.scrollBy({left: dir * w, behavior: 'smooth'}); }
  $('#xPrev').addEventListener('click', function(){ step(-1); });
  $('#xNext').addEventListener('click', function(){ step(1); });
})();
var xmIndex = -1, lastFocus = null;
function fillXM(){
  var x = XP[xmIndex];
  $('#xmImg').src = IMG[x.img];
  $('#xmCount').textContent = (xmIndex + 1) + ' / ' + XP.length;
  $('#xmT').textContent = t(x.id + '.n'); $('#xmD').textContent = t(x.id + '.l');
  $('#xmL').innerHTML = '<li>' + t(x.id + '.i1') + '</li><li>' + t(x.id + '.i2') + '</li><li>' + t(x.id + '.i3') + '</li>';
}
function openXM(i){
  if(window.__cursorReset) window.__cursorReset();
  lastFocus = document.activeElement; xmIndex = i; fillXM();
  var m = $('#xm'); m.classList.add('open'); m.setAttribute('aria-hidden','false'); lockScroll(true);
  setTimeout(function(){ $('#xmClose').focus(); }, 60);
}
function closeXM(){ var m = $('#xm'); if(!m.classList.contains('open')) return; m.classList.remove('open'); m.setAttribute('aria-hidden','true'); xmIndex = -1; lockScroll(false); if(lastFocus) lastFocus.focus(); }
function stepXM(d){ xmIndex = (xmIndex + d + XP.length) % XP.length; var m = $('#xmImg'); m.style.opacity = 0; setTimeout(function(){ fillXM(); m.style.opacity = 1; }, 160); m.style.transition = 'opacity .3s'; }
$('#xmClose').addEventListener('click', closeXM);
$('#xmPrev').addEventListener('click', function(){ stepXM(-1); });
$('#xmNext').addEventListener('click', function(){ stepXM(1); });
$('#xmCta').addEventListener('click', function(e){ e.preventDefault(); var id = XP[xmIndex].id; closeXM(); prefill({type: id}); setTimeout(function(){ goto('plan'); }, 60); });

/* ---------- Gallery ---------- */
var GAL = [{img:'courtyard',cap:'d.ant.n'},{img:'atitlan',cap:'d.atit.n'},{img:'amalfi',cap:'w.it.n'},{img:'dinner',cap:'x1.n'},{img:'weaving',cap:'x6.n'},{img:'tikal',cap:'d.pet.n'}];
var lbIndex = -1;
function renderGallery(){
  var m = $('#mosaic'); m.innerHTML = '';
  GAL.forEach(function(g,i){ var b = el('button'); b.type = 'button'; b.dataset.cap = t(g.cap); b.dataset.cursor = 'x.open'; b.setAttribute('aria-label', t(g.cap)); b.innerHTML = '<img alt="" src="' + IMG[g.img] + '">'; b.addEventListener('click', function(){ openLB(i); }); m.appendChild(b); });
  if(lbIndex >= 0) fillLB();
}
function fillLB(){ var g = GAL[lbIndex]; $('#lbImg').src = IMG[g.img]; $('#lbImg').alt = t(g.cap); $('#lbCap').textContent = t(g.cap); }
function openLB(i){ if(window.__cursorReset) window.__cursorReset(); lastFocus = document.activeElement; lbIndex = i; fillLB(); var l = $('#lb'); l.classList.add('open'); l.setAttribute('aria-hidden','false'); lockScroll(true); setTimeout(function(){ $('#lbC').focus(); }, 50); }
function closeLB(){ var l = $('#lb'); if(!l.classList.contains('open')) return; l.classList.remove('open'); l.setAttribute('aria-hidden','true'); lbIndex = -1; lockScroll(false); if(lastFocus) lastFocus.focus(); }
function stepLB(d){ lbIndex = (lbIndex + d + GAL.length) % GAL.length; fillLB(); }
$('#lbC').addEventListener('click', closeLB); $('#lbP').addEventListener('click', function(){ stepLB(-1); }); $('#lbN').addEventListener('click', function(){ stepLB(1); });
$('#lb').addEventListener('click', function(e){ if(e.target === this) closeLB(); });

/* ---------- Bespoke timeline ---------- */
var TLIMGS = ['courtyard','lounge','lake','pool'];
(function(){ var f = $('#bspFrame'); TLIMGS.forEach(function(k,i){ var im = el('img'); im.alt = ''; im.src = IMG[k]; if(i === 0) im.className = 'on'; f.appendChild(im); }); })();
var steps = $$('.step'), tlFill = $('#tlFill'), tlBox = $('#tl'), tlCur = -1;
function tlUpdate(){
  var r = tlBox.getBoundingClientRect(), vh = window.innerHeight;
  var p = Math.max(0, Math.min(1, (vh * 0.55 - r.top) / r.height));
  tlFill.style.transform = 'scaleY(' + p.toFixed(3) + ')';
  var best = -1, bd = 1e9;
  steps.forEach(function(s,i){ var b = s.getBoundingClientRect(), c = b.top + b.height/2, d = Math.abs(c - vh*0.5); var passed = b.top < vh * 0.62; s.classList.toggle('on', passed && b.bottom > vh * 0.2); if(d < bd && b.top < vh && b.bottom > 0){ bd = d; best = i; } });
  if(best >= 0 && best !== tlCur){ tlCur = best; $$('#bspFrame img').forEach(function(im,i){ im.classList.toggle('on', i === best); }); }
}

/* ---------- Form ---------- */
var DESTS = ['ant','atit','pet','pac','it','jp','ea','jo','mv','open'];
var form = { travelers:2, budget:-1, types:[] };
function destLabel(id){ if(id === 'open') return t('f.open'); if(['ant','atit','pet','pac'].indexOf(id) >= 0) return t('d.' + id + '.n'); return t('w.' + id + '.n'); }
function renderForm(){
  var sel = $('#fDest'), cur = sel.value; sel.innerHTML = '';
  var o0 = el('option','',t('f.sel')); o0.value = ''; sel.appendChild(o0);
  DESTS.forEach(function(d){ var o = el('option','',destLabel(d)); o.value = d; sel.appendChild(o); });
  sel.value = cur;
  var bd = $('#fBudget'); bd.innerHTML = '';
  BUDGET[lang].forEach(function(lbl,i){ var b = el('button','',lbl); b.type = 'button'; b.setAttribute('aria-pressed', i === form.budget ? 'true':'false'); b.addEventListener('click', function(){ form.budget = (form.budget === i ? -1 : i); renderForm(); }); bd.appendChild(b); });
  var ty = $('#fType'); ty.innerHTML = '';
  XP.forEach(function(x){ var b = el('button','',t(x.id + '.n')); b.type = 'button'; b.setAttribute('aria-pressed', form.types.indexOf(x.id) >= 0 ? 'true':'false'); b.addEventListener('click', function(){ var k = form.types.indexOf(x.id); if(k >= 0) form.types.splice(k,1); else form.types.push(x.id); renderForm(); }); ty.appendChild(b); });
  $('#trV').textContent = form.travelers;
}
function prefill(o){
  if(o.dest){ $('#fDest').value = o.dest; }
  if(o.type){ var id = o.type === 'celebration' ? 'x3' : o.type; if(form.types.indexOf(id) < 0) form.types.push(id); renderForm(); }
}
$('#trM').addEventListener('click', function(){ form.travelers = Math.max(1, form.travelers - 1); $('#trV').textContent = form.travelers; });
$('#trP').addEventListener('click', function(){ form.travelers = Math.min(20, form.travelers + 1); $('#trV').textContent = form.travelers; });
function setBad(input, bad){ var f = input.closest('.fld'); f.classList.toggle('bad', bad); input.setAttribute('aria-invalid', bad ? 'true':'false'); }
$('#form').addEventListener('submit', function(e){
  e.preventDefault();
  var name = $('#fName'), email = $('#fEmail'), country = $('#fCountry'), consent = $('#fConsent');
  var okE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim());
  var errs = [];
  if(!name.value.trim()) errs.push(name); setBad(name, !name.value.trim());
  if(!okE){ email.closest('.fld').querySelector('.err').textContent = email.value.trim() ? t('f.err.email') : t('f.err.req'); errs.push(email); } setBad(email, !okE);
  if(!country.value.trim()) errs.push(country); setBad(country, !country.value.trim());
  consent.closest('.fld').classList.toggle('bad', !consent.checked); if(!consent.checked) errs.push(consent);
  if(errs.length){ errs[0].focus(); return; }
  var btn = $('#fSubmit'); btn.disabled = true; btn.textContent = t('f.sending');
  var payload = toSpanish({ lang: lang, name: name.value.trim(), email: email.value.trim(), country: country.value.trim(), phone: $('#fPhone').value.trim(), destination: $('#fDest').value, dates: $('#fDates').value.trim(), travelers: form.travelers, budget: form.budget >= 0 ? BUDGET.en[form.budget] : '', experiences: form.types.slice(), message: $('#fMsg').value.trim(), consent: true, source: 'web', ts: new Date().toISOString() });
  submitInquiry(payload).then(function(){
    $('#form').style.display = 'none'; var th = $('#thanks'); th.classList.add('show'); th.focus();
    btn.disabled = false; btn.setAttribute('data-i','f.submit'); btn.textContent = t('f.submit');
  });
});
$('#again').addEventListener('click', function(){ $('#form').reset(); form.travelers = 2; form.budget = -1; form.types = []; renderForm(); $('#thanks').classList.remove('show'); $('#form').style.display = ''; $('#fName').focus(); });
/* contact alternatives */
var toastT;
function toast(msg){ var n = $('#toast'); n.textContent = msg; n.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(function(){ n.classList.remove('show'); }, 4800); }
$('#btnWA').addEventListener('click', function(){
  var msg = t('c.wa.msg'), n = $('#fName').value.trim(), d = $('#fDest').value;
  if(n) msg += ' — ' + n; if(d) msg += ' (' + destLabel(d) + ')';
  window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
});
$('#btnCal').addEventListener('click', function(){ if(CALENDLY_URL) window.open(CALENDLY_URL, '_blank', 'noopener'); else toast(t('c.cal.soon')); });
$('#btnCall').addEventListener('click', function(){ var o = $('#callbox').classList.toggle('open'); this.setAttribute('aria-expanded', o ? 'true':'false'); if(o) $('#callPhone').focus(); });
$('#callSend').addEventListener('click', function(){
  var ph = $('#callPhone'); if(!ph.value.trim()){ ph.focus(); return; }
  submitInquiry(callbackEs(ph.value.trim(), $('#callTime').value)).then(function(){ toast(t('c.call.ok')); $('#callbox').classList.remove('open'); $('#btnCall').setAttribute('aria-expanded','false'); ph.value = ''; });
});

/* ---------- Overlays: Esc + focus trap ---------- */
function closeAll(keepMenu){ closeXM(); closeLB(); closeLangMenu(); if(!keepMenu && document.body.classList.contains('menu')){ document.body.classList.remove('menu'); lockScroll(false); } else if(keepMenu && document.documentElement.style.overflow === 'hidden' && !$('#xm').classList.contains('open') && !$('#lb').classList.contains('open')){ lockScroll(false); } }
document.addEventListener('keydown', function(e){
  if(e.key === 'Escape'){ closeAll(); }
  if($('#xm').classList.contains('open')){
    if(e.key === 'ArrowRight') stepXM(1); if(e.key === 'ArrowLeft') stepXM(-1);
    if(e.key === 'Tab'){ var f = $$('#xm button, #xm a'); var first = f[0], last = f[f.length-1]; if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); } else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); } }
  }
  if($('#lb').classList.contains('open')){ if(e.key === 'ArrowRight') stepLB(1); if(e.key === 'ArrowLeft') stepLB(-1); if(e.key === 'Tab'){ e.preventDefault(); $('#lbC').focus(); } }
});

/* ---------- Render all language-dependent parts ---------- */
function renderAll(){
  renderGtTexts(); renderGtCard(false);
  renderWorldTexts(); renderWCard(false);
  renderXP(); renderGallery(); renderForm();
  applyI18n();
}

/* ---------- Counters ---------- */
function runCounters(){
  var els = $$('.count');
  if(reduce || !('IntersectionObserver' in window)){ els.forEach(function(c){ c.textContent = c.dataset.n; }); return; }
  var io = new IntersectionObserver(function(es){ es.forEach(function(en){ if(!en.isIntersecting) return; io.unobserve(en.target); var c = en.target, n = +c.dataset.n, t0 = null;
    (function tick(ts){ if(t0 === null) t0 = ts; var p = Math.min(1, (ts - t0) / 1600), v = 1 - Math.pow(1 - p, 3); c.textContent = Math.round(v * n); if(p < 1) requestAnimationFrame(tick); })(performance.now()); }); }, {threshold:.6});
  els.forEach(function(c){ io.observe(c); });
}

/* ---------- Custom cursor ---------- */
if(fine && !reduce){
  document.documentElement.classList.add('has-cursor');
  var dot = $('.cur-dot'), ring = $('.cur-ring'), lab = $('.cur-label'), mx = -100, my = -100, rx = -100, ry = -100;
  function cursorState(t0){
    var tg = t0 && t0.closest ? t0.closest('[data-cursor],a,button,summary,label,[role="option"],[role="button"],.pin,.wpin') : null;
    var inp = t0 && t0.closest ? t0.closest('input,textarea,select') : null;
    ring.classList.toggle('hide', !!inp);
    if(tg && tg.dataset && tg.dataset.cursor){ lab.textContent = t(tg.dataset.cursor); ring.classList.add('lab'); ring.classList.remove('link'); }
    else if(tg){ ring.classList.add('link'); ring.classList.remove('lab'); }
    else { ring.classList.remove('link','lab'); }
  }
  window.addEventListener('pointermove', function(e){ mx = e.clientX; my = e.clientY; dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)'; cursorState(e.target); }, {passive:true});
  window.addEventListener('scroll', function(){ if(mx > 0) cursorState(document.elementFromPoint(mx, my)); }, {passive:true});
  window.__cursorReset = function(){ ring.classList.remove('link','lab'); };
  (function loop(){ rx += (mx - rx) * .16; ry += (my - ry) * .16; ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)'; requestAnimationFrame(loop); })();
}

/* ---------- Optional hero video ---------- */
if(HERO_VIDEO){ var v = document.createElement('video'); v.muted = true; v.loop = true; v.autoplay = true; v.playsInline = true; v.setAttribute('playsinline',''); v.poster = IMG.pool; v.src = HERO_VIDEO; $('#heroMedia').insertBefore(v, $('.hero-shade')); v.play && v.play().catch(function(){}); }

/* ---------- GSAP: hero sequence, scroll transformation, parallax, reveals ---------- */
function initMotion(){
  if(!hasG || reduce) return;
  gsap.from('.hero-copy > *', {y:46, opacity:0, duration:1.5, ease:'power3.out', stagger:.16, delay:.25});
  gsap.from('.hero-media .kb img', {scale:1.2, duration:2.8, ease:'power2.out'});
  var mm = gsap.matchMedia();
  mm.add('(min-width: 900px)', function(){
    var tl = gsap.timeline({scrollTrigger:{trigger:'#home', start:'top top', end:'+=150%', scrub:1, pin:true, anticipatePin:1}});
    tl.to('.hero-copy', {opacity:0, y:-90, duration:.3, ease:'power1.in'}, 0)
      .to('.scrollhint', {opacity:0, duration:.15}, 0)
      .to('#heroMedia', {clipPath:'inset(13% 53% 13% 7% round 999px 999px 0px 0px)', duration:1, ease:'power2.inOut'}, 0)
      .to('.hero-media .kb img', {objectPosition:'14% 58%', duration:1, ease:'power2.inOut'}, 0)
      .to('.hero-shade', {opacity:0, duration:.7}, 0.1)
      .fromTo('.manifesto', {opacity:0, x:70}, {opacity:1, x:0, duration:.5, ease:'power2.out'}, .5);
    return function(){ gsap.set(['.hero-copy','.scrollhint','#heroMedia','.hero-shade','.manifesto'], {clearProps:'all'}); };
  });
  $$('[data-px] img').forEach(function(im){ gsap.fromTo(im, {yPercent:-7}, {yPercent:7, ease:'none', scrollTrigger:{trigger:im.parentNode, start:'top bottom', end:'bottom top', scrub:true}}); });
  $$('[data-reveal]').forEach(function(n){ gsap.from(n, {y:34, opacity:0, duration:1.2, ease:'power3.out', scrollTrigger:{trigger:n, start:'top 88%', once:true}}); });
  $$('[data-wipe]').forEach(function(n){ gsap.fromTo(n, {clipPath:'inset(100% 0 0 0)'}, {clipPath:'inset(0% 0 0 0)', duration:1.6, ease:'power3.inOut', scrollTrigger:{trigger:n, start:'top 85%', once:true}, onComplete:function(){ n.style.clipPath = 'none'; }}); });
  $$('.xc').forEach(function(c,i){ gsap.from(c, {y:60, opacity:0, duration:1.1, ease:'power3.out', delay:i*0.06, scrollTrigger:{trigger:'#track', start:'top 85%', once:true}}); });
}

/* ---------- Boot ---------- */
(function boot(){
  var saved = null; try{ saved = localStorage.getItem('aviora-lang'); }catch(e){}
  var nav = (navigator.language || 'en').slice(0,2).toLowerCase();
  var start = ENABLED.indexOf(saved) >= 0 ? saved : (ENABLED.indexOf(nav) >= 0 ? nav : 'en');
  buildGtMap(); buildWorld();
  lang = start; applyI18n(); renderAll(); applyWFilter();
  runCounters(); initMotion(); onScroll();
  if(document.readyState === 'complete'){ if(hasG) setTimeout(function(){ ScrollTrigger.refresh(); }, 200); } else window.addEventListener('load', function(){ if(hasG) ScrollTrigger.refresh(); });
})();
}
