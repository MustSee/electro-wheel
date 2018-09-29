// Musique concrète

// Toujours, le nom des artistes est en majuscule
// On pase à l'artiste suivant par l'intermédiaire de " - "

let concrete =
  "PIERRE SCHAEFFER, Complete Works, INA/GRM - " +
  "PIERRE HENRY, L'Homme à la caméra, Fragments pour Artaud, Le Voyage, Mantra - " +
  "KARLHEINZ STOCKHAUSEN, Hymnen, Kontakte, Telemusik, Stockhausen Verlag - " +
  "DAVID TUDOR, Rainforest, Lovely Music - " +
  "IANNIS XENAKIS, Electronic Music, EMF - " +
  "LUC FERRARI, Acousmatrix 3, INA/GRM - " +
  "VITTORIO GELMETTI, Musiche Elettroniche, Nepless - " +
  "BBC RADIOPHONIC WORKSHOP, Tomb of the Cybermen, Via Satellite - " +
  "RUNE LINDBLAD, Death of the Moon, Pogus - " +
  "TOD DOCKSTADER, Quatermass, Starkland.";

// Krautrock

// On ne sait pas toujours si c'est un titre ou un éditeur de musique
// Germanofon, Spoon + l'année après, INA ci-dessus, EMF, Casablanca => faire une liste ?

let krautrock =
  "CAN, Tago Mago, Spoon, 1971 - Future Days, Spoon, 1973 - Soon Over Babaluma, Spoon, 1974 - " +
  "NEU!, Neu!, Germanofon - Neu! 2, Germanofon - Neu! 75, Germanofon - " +
  "FAUST, Faust, Polydor, 1971 - So Far, Polydor, 1972 - The Faust Tapes, ReR, 1973 - Faust IV, Virgin, 1973 - " +
  "CLUSTER, Cluster II, Tempel - " +
  "KRAFTWERK, Kraftwerk 2, Germanofon, 1972 - " +
  "AMON DUUL II, Yeti, Liberty/UA – " +
  "POPOL VUH, In den Garten Pharaos', Pilz - " +
  "ASH RA TEMPEL, Join Inn, Ohr; réédité chez Purple Pyramid - " +
  "COSMIC JOKERS, Planeten Sit-In, Spalax - " +
  "HARMONIA, Musik von Harmonia, Germanofon.";

// Les titres des chansons seuls sont entre guillemets : "I feel Love" , Casablanca records, s'il y a l'année après,
// précédemment c'est un éditeur de musique
// peut-être ajouter full album à la fin de la recherche sur album, pour ne pas tomber uniquement sur la chanson.

let disco =
  'DONNA SUMMER, "I Feel Love”, Casablanca, 1977 - ' +
  'MARTIN CIRCUS, “Disco Circus”, Prelude, 1979 - ' +
  'SYLVESTER, “(You Make Me Feel) Mighty Real”, Fantasy, 1979 - ' +
  'SYLVESTER, “Do You Wanna Funk?", Fantasy, 1980 - ' +
  'DINOSAUR L., “Go Bang!”, Sleeping Bag, 1982 - ' +
  'PEECH BOYS, “Don\'t Make Me Wait”, West End, 1982 - ' +
  'THE J.B.\'s, Damn Right I Am Somebody, People, 1974 - ' +
  'DEXTER WANSELL, "Life on Mars”, Philadelphia International, 1976 - ' +
  'PARLIAMENT, Mothership Connection, Casablanca, 1976 - ' +
  'PARLIAMENT, Funkentelechy vs. the Placebo Syndrome, Casablanca, 1977.';

// Virgin, Rough Trade, Siren, Eskaton, Epic, Ralph, Red Star, Mute

let postPunk =
  "CABARET VOLTAIRE, Red Mecca, Rough Trade, 1981 - " +
  "CHROME, Alien Soundtracks, Siren, 1978 - " +
  "COIL, Time Machines, Eskaton, 1996 - " +
  "DAF, Für immer, Virgin, 1982 - " +
  "FRONT 242, Front By Front, Epic, 1988 - " +
  "THE RESIDENTS, Meet the Residents, Ralph, 1974 - " +
  "SUICIDE, Suicide, Red Star, 1977 - " +
  "THROBBING GRISTLE, 20 Jazz Funk Greats, Mute, 1979.";

// artistes divers !!
// Ici les maisons d'éditions n'ont pas de date : Trax, Relief, Mastercuts.. Tous ici apparemment
// faire attention s'il y a mix.toLowerCase() :)

let house =
  "ARTISTES DIVERS, The House That Trax Built, Trax - " +
  "ARTISTES DIVERS, Classic Acid, Mastercuts - " +
  "GREEN VELVET, Flash, Relief - " +
  "ARTISTES DIVERS, Collective Sounds of Prescription, Prescription Underground - " +
  "BUCKETHEADS, The Bomb, Henry Street - " +
  "MOODYMAN, Silent Introduction, Planet E - " +
  "DEEP DISH, Penetrate Deeper, Tribal UK - " +
  "DAFT PUNK, Homework, Virgin - " +
  // Ici et en dessous, il y a le titre, le mix puis la maison d'édition
  "TORI AMOS, Professional Widow, Armand Van Helden Mix, Atlantic – " +
  "ST. GERMAIN, Alabama Blues Revisited, Todd Edwards Vocal Mix, F Communications – " +
  "187 LOCKDOWN, Gunman, East West Dance - " +
  "DEM 2, Destiny, New Vocal Mix, Locked On - " +
  "EZ, Presents Underground Garage Flav's, Breakdown Records - " +
  "BASIC CHANNEL, Phylyps Track 1/11, Basic Channel - " +
  "JEPHTE GUILLAME, The Prayer, Spiritual Life.";

// Même chose que pour la disco, les éditeurs n'ont pas de date, mais sont en dernière position
// Tommy Boy...
// Les chansons sont entre quotes

let hipHop =
  'AFRIKA BAMBAATAA & SOUL SONIC FORCE, "Planet Rock”, Tommy Boy – ' +
  'GRANDMASTER FLASH, Adventures of Grandmaster Flash on the Wheels of Steel, Sugarhill – ' +
  'RAMMELZEE VS. K-ROB, "Beat Bop”, Profile - ' +
  'DE LA SOUL, “Plug Tunin”, Tommy Boy - ' +
  'THE FEARLESS FOUR, "Rockin\' It”, Enjoy - ' +
  'ERIC B & RAKIM, “Follow the Leader”, MCA - ' +
  'PUBLIC ENEMY, It Takes a Nation of Millions To Hold Us Back, Def Jam - ' +
  'WU-TANG CLAN, Enter the Wu-Tang (36 Chambers), RCA/BMG - ' +
  'PHONOSYCOGRAPH, Ancient Termites, Bomb Hip-Hop - ' +
  'OUTKAST, Aquemini, LaFace.';
