import { Event, Registration, Team, Field, Player } from "../types";

export const seedData = {
  events: [
    {
      id: 1,
      name: "Operación Black Hawk",
      description: "Operación táctica de infiltración en territorio hostil",
      type: "Milsim",
      level: "Avanzado",
      coverImage: null,
      date: "24 May 2024",
      dateSort: "2024-05-24",
      startTime: "09:00",
      endTime: "18:00",
      fieldId: 2,
      field: "Campo Delta",
      city: "Madrid",
      modality: "Milsim",
      equipment: ["Réplica homologada", "Cargador de gas", "Protección ocular obligatoria"],
      rules: "FPS máximo 350, blindaje obligatorio",
      additionalInfo: "Traer agua y comida suficiente",
      price: 15,
      maxCapacity: 60,
      minPlayers: 20,
      status: "Publicado",
      enrolled: 48,
      revenue: 720,
      img: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=96&h=64&fit=crop&auto=format",
    },
    {
      id: 2,
      name: "Misión Red Dawn",
      description: "Rescate de rehenes en entorno urbano",
      type: "CQB",
      level: "Intermedio",
      coverImage: null,
      date: "31 May 2024",
      dateSort: "2024-05-31",
      startTime: "10:00",
      endTime: "17:00",
      fieldId: 3,
      field: "Campo Alpha",
      city: "Barcelona",
      modality: "CQB",
      equipment: ["Réplica homologada", "Protección ocular obligatoria", "Casco recomendado"],
      rules: "FPS máximo 320",
      additionalInfo: "Zona indoor",
      price: 10,
      maxCapacity: 50,
      minPlayers: 15,
      status: "Publicado",
      enrolled: 35,
      revenue: 350,
      img: "https://images.unsplash.com/photo-1579656381254-20f2f7b4c7b5?w=96&h=64&fit=crop&auto=format",
    },
    {
      id: 3,
      name: "Asalto al Fuerte",
      description: "Conquista de fortificación enemiga",
      type: "Woodland",
      level: "Todos los niveles",
      coverImage: null,
      date: "07 Jun 2024",
      dateSort: "2024-06-07",
      startTime: "08:00",
      endTime: "20:00",
      fieldId: 1,
      field: "Campo Delta",
      city: "Valencia",
      modality: "Woodland",
      equipment: ["Réplica homologada", "Protección ocular obligatoria", "Uniforme militar"],
      rules: "FPS máximo 350",
      additionalInfo: "Terreno boscoso",
      price: 12,
      maxCapacity: 40,
      minPlayers: 15,
      status: "Borrador",
      enrolled: 20,
      revenue: 170,
      img: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=96&h=64&fit=crop&auto=format",
    },
    {
      id: 4,
      name: "Venganza",
      description: "Misión de venganza personal",
      type: "Milsim",
      level: "Avanzado",
      coverImage: null,
      date: "21 Jun 2024",
      dateSort: "2024-06-21",
      startTime: "09:00",
      endTime: "18:00",
      fieldId: 4,
      field: "Campo Omega",
      city: "Toledo",
      modality: "Milsim",
      equipment: ["Réplica homologada", "Protección ocular obligatoria", "Chaleco táctico"],
      rules: "FPS máximo 350",
      additionalInfo: "Scenario complejo",
      price: 15,
      maxCapacity: 30,
      minPlayers: 10,
      status: "Borrador",
      enrolled: 15,
      revenue: 0,
      img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=96&h=64&fit=crop&auto=format",
    },
    {
      id: 5,
      name: "Blackout",
      description: "Operación nocturna de infiltración",
      type: "Nocturno",
      level: "Intermedio",
      coverImage: null,
      date: "05 Jul 2024",
      dateSort: "2024-07-05",
      startTime: "20:00",
      endTime: "04:00",
      fieldId: 6,
      field: "Campo Base Sur",
      city: "Valencia",
      modality: "Nocturno",
      equipment: ["Réplica homologada", "Protección ocular obligatoria", "Linterna táctica"],
      rules: "FPS máximo 320, uso de linternas obligatorio",
      additionalInfo: "Operación bajo oscuridad",
      price: 18,
      maxCapacity: 50,
      minPlayers: 15,
      status: "Borrador",
      enrolled: 0,
      revenue: 0,
      img: "https://images.unsplash.com/photo-1465447142348-e9952c393450?w=96&h=64&fit=crop&auto=format",
    },
    {
      id: 6,
      name: "Operación Tormenta",
      description: "Asalto anfibio a base costera",
      type: "Woodland",
      level: "Avanzado",
      coverImage: null,
      date: "15 Mar 2024",
      dateSort: "2024-03-15",
      startTime: "08:00",
      endTime: "19:00",
      fieldId: 5,
      field: "Campo Norte",
      city: "Bilbao",
      modality: "Woodland",
      equipment: ["Réplica homologada", "Protección ocular obligatoria", "Botas de agua"],
      rules: "FPS máximo 350",
      additionalInfo: "Terreno con agua",
      price: 20,
      maxCapacity: 60,
      minPlayers: 20,
      status: "Finalizado",
      enrolled: 52,
      revenue: 1040,
      img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=96&h=64&fit=crop&auto=format",
    },
    {
      id: 7,
      name: "Misión Cobra",
      description: "Eliminación de objetivo de alto valor",
      type: "CQB",
      level: "Intermedio",
      coverImage: null,
      date: "02 Feb 2024",
      dateSort: "2024-02-02",
      startTime: "10:00",
      endTime: "17:00",
      fieldId: 7,
      field: "Campo Sur",
      city: "Sevilla",
      modality: "CQB",
      equipment: ["Réplica homologada", "Protección ocular obligatoria"],
      rules: "FPS máximo 320",
      additionalInfo: "Zona urbana",
      price: 10,
      maxCapacity: 50,
      minPlayers: 15,
      status: "Finalizado",
      enrolled: 44,
      revenue: 880,
      img: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=96&h=64&fit=crop&auto=format",
    },
    {
      id: 8,
      name: "Asedio al Búnker",
      description: "Asedio prolongado a búnker fortificado",
      type: "Milsim",
      level: "Avanzado",
      coverImage: null,
      date: "10 Ene 2024",
      dateSort: "2024-01-10",
      startTime: "09:00",
      endTime: "18:00",
      fieldId: 2,
      field: "Campo Delta",
      city: "Madrid",
      modality: "Milsim",
      equipment: ["Réplica homologada", "Protección ocular obligatoria", "Chaleco táctico"],
      rules: "FPS máximo 350",
      additionalInfo: "Larga duración",
      price: 15,
      maxCapacity: 40,
      minPlayers: 15,
      status: "Finalizado",
      enrolled: 38,
      revenue: 570,
      img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=96&h=64&fit=crop&auto=format",
    },
    {
      id: 9,
      name: "Operación Fantasma",
      description: "Infiltración sigilosa en base enemiga",
      type: "Woodland",
      level: "Avanzado",
      coverImage: null,
      date: "18 Abr 2024",
      dateSort: "2024-04-18",
      startTime: "08:00",
      endTime: "18:00",
      fieldId: 3,
      field: "Campo Alpha",
      city: "Barcelona",
      modality: "Woodland",
      equipment: ["Réplica homologada", "Protección ocular obligatoria", "Uniforme camuflaje"],
      rules: "FPS máximo 350",
      additionalInfo: "Sigilo obligatorio",
      price: 15,
      maxCapacity: 45,
      minPlayers: 15,
      status: "Cancelado",
      enrolled: 0,
      revenue: 0,
      img: "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=96&h=64&fit=crop&auto=format",
    },
    {
      id: 10,
      name: "Noche de Lobos",
      description: "Caza nocturna en bosque",
      type: "Nocturno",
      level: "Intermedio",
      coverImage: null,
      date: "28 Abr 2024",
      dateSort: "2024-04-28",
      startTime: "21:00",
      endTime: "05:00",
      fieldId: 4,
      field: "Campo Omega",
      city: "Toledo",
      modality: "Nocturno",
      equipment: ["Réplica homologada", "Protección ocular obligatoria", "Visión nocturna"],
      rules: "FPS máximo 320",
      additionalInfo: "Solo equipos experimentados",
      price: 18,
      maxCapacity: 60,
      minPlayers: 20,
      status: "Cancelado",
      enrolled: 8,
      revenue: 0,
      img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=96&h=64&fit=crop&auto=format",
    },
  ] as Event[],

  registrations: [
    {
      id: 1,
      playerId: 1,
      player: "RaiderX",
      initials: "RX",
      avatarColor: "#1d4ed8",
      teamId: 4,
      team: "Delta Force",
      eventId: 1,
      event: "Operación Black Hawk",
      eventDate: "24 May 2024",
      registrationDate: "12/05/2024",
      paymentStatus: "Pagado",
      status: "Confirmada",
      phone: "+34 612 345 678",
      email: "raiderx@airsoft.es",
    },
    {
      id: 2,
      playerId: 2,
      player: "Ghost_7",
      initials: "G7",
      avatarColor: "#7c3aed",
      teamId: 3,
      team: "Shadow Wolves",
      eventId: 2,
      event: "Misión Red Dawn",
      eventDate: "31 May 2024",
      registrationDate: "14/05/2024",
      paymentStatus: "Pagado",
      status: "Confirmada",
      phone: "+34 623 456 789",
      email: "ghost7@mail.com",
    },
    {
      id: 3,
      playerId: 3,
      player: "Viper45",
      initials: "V4",
      avatarColor: "#be185d",
      teamId: 2,
      team: "Iron Snakes",
      eventId: 3,
      event: "Asalto al Fuerte",
      eventDate: "07 Jun 2024",
      registrationDate: "15/05/2024",
      paymentStatus: "Pendiente",
      status: "Pendiente",
      phone: "+34 634 567 890",
      email: "viper45@gmail.com",
      notes: "Solicita plaza en equipo BLUFOR",
    },
    {
      id: 4,
      playerId: 4,
      player: "HunterK",
      initials: "HK",
      avatarColor: "#b45309",
      teamId: 6,
      team: "Ghost Recon",
      eventId: 1,
      event: "Operación Black Hawk",
      eventDate: "24 May 2024",
      registrationDate: "13/05/2024",
      paymentStatus: "Pagado",
      status: "Confirmada",
      phone: "+34 645 678 901",
      email: "hunterk@airmail.es",
    },
    {
      id: 5,
      playerId: 5,
      player: "TacticalOne",
      initials: "T1",
      avatarColor: "#0f766e",
      teamId: 7,
      team: "Red Devils",
      eventId: 2,
      event: "Misión Red Dawn",
      eventDate: "31 May 2024",
      registrationDate: "16/05/2024",
      paymentStatus: "Pendiente",
      status: "Pendiente",
      phone: "+34 656 789 012",
      email: "t1ops@outlook.com",
      notes: "Alérgico al látex, informar al equipo médico",
    },
    {
      id: 6,
      playerId: 6,
      player: "OperativeLegend",
      initials: "OL",
      avatarColor: "#15803d",
      teamId: 4,
      team: "Delta Force",
      eventId: 1,
      event: "Operación Black Hawk",
      eventDate: "24 May 2024",
      registrationDate: "10/05/2024",
      paymentStatus: "Pagado",
      status: "Confirmada",
      phone: "+34 667 890 123",
      email: "oplegend@airsoft.es",
    },
    {
      id: 7,
      playerId: 7,
      player: "Sniper_44",
      initials: "S4",
      avatarColor: "#c2410c",
      teamId: 8,
      team: "Alpha Squad",
      eventId: 3,
      event: "Asalto al Fuerte",
      eventDate: "07 Jun 2024",
      registrationDate: "17/05/2024",
      paymentStatus: "Pendiente",
      status: "Pendiente",
      phone: "+34 678 901 234",
      email: "sniper44@proton.me",
    },
    {
      id: 8,
      playerId: 8,
      player: "CobaltMike",
      initials: "CM",
      avatarColor: "#4338ca",
      teamId: 9,
      team: "Cobra Team",
      eventId: 4,
      event: "Venganza",
      eventDate: "21 Jun 2024",
      registrationDate: "18/05/2024",
      paymentStatus: "Pagado",
      status: "Confirmada",
      phone: "+34 689 012 345",
      email: "cobaltmike@mail.es",
    },
    {
      id: 9,
      playerId: 9,
      player: "NightOwl",
      initials: "NO",
      avatarColor: "#0e7490",
      teamId: 10,
      team: "Lone Wolves",
      eventId: 1,
      event: "Operación Black Hawk",
      eventDate: "24 May 2024",
      registrationDate: "11/05/2024",
      paymentStatus: "Pagado",
      status: "Confirmada",
      phone: "+34 690 123 456",
      email: "nightowl@gmail.com",
    },
    {
      id: 10,
      playerId: 10,
      player: "Bravo_Six",
      initials: "B6",
      avatarColor: "#9f1239",
      teamId: 6,
      team: "Ghost Recon",
      eventId: 2,
      event: "Misión Red Dawn",
      eventDate: "31 May 2024",
      registrationDate: "15/05/2024",
      paymentStatus: "Reembolsado",
      status: "Cancelada",
      phone: "+34 601 234 567",
      email: "bravo6@airsoft.es",
      notes: "Lesión. Se reembolsó el pago.",
    },
    {
      id: 11,
      playerId: 11,
      player: "PhantomX",
      initials: "PX",
      avatarColor: "#1d4ed8",
      teamId: 3,
      team: "Shadow Wolves",
      eventId: 3,
      event: "Asalto al Fuerte",
      eventDate: "07 Jun 2024",
      registrationDate: "19/05/2024",
      paymentStatus: "Pendiente",
      status: "Pendiente",
      phone: "+34 612 111 222",
      email: "phantomx@mail.com",
    },
    {
      id: 12,
      playerId: 12,
      player: "IronBull",
      initials: "IB",
      avatarColor: "#7c3aed",
      teamId: 2,
      team: "Iron Snakes",
      eventId: 4,
      event: "Venganza",
      eventDate: "21 Jun 2024",
      registrationDate: "20/05/2024",
      paymentStatus: "Pagado",
      status: "Confirmada",
      phone: "+34 623 222 333",
      email: "ironbull@airsoft.es",
    },
    {
      id: 13,
      playerId: 13,
      player: "ReconAlpha",
      initials: "RA",
      avatarColor: "#0f766e",
      teamId: 8,
      team: "Alpha Squad",
      eventId: 1,
      event: "Operación Black Hawk",
      eventDate: "24 May 2024",
      registrationDate: "12/05/2024",
      paymentStatus: "Exento",
      status: "Confirmada",
      phone: "+34 634 333 444",
      email: "reconalpha@gmail.com",
      notes: "Organizador colaborador, exento de pago",
    },
    {
      id: 14,
      playerId: 14,
      player: "ViperStrike",
      initials: "VS",
      avatarColor: "#15803d",
      teamId: 7,
      team: "Red Devils",
      eventId: 5,
      event: "Blackout",
      eventDate: "05 Jul 2024",
      registrationDate: "21/05/2024",
      paymentStatus: "Pendiente",
      status: "Pendiente",
      phone: "+34 645 444 555",
      email: "viperstrike@mail.es",
    },
    {
      id: 15,
      playerId: 15,
      player: "DarkMatter",
      initials: "DM",
      avatarColor: "#c2410c",
      teamId: 9,
      team: "Cobra Team",
      eventId: 2,
      event: "Misión Red Dawn",
      eventDate: "31 May 2024",
      registrationDate: "14/05/2024",
      paymentStatus: "Pagado",
      status: "Rechazada",
      phone: "+34 656 555 666",
      email: "darkmatter@outlook.com",
      notes: "Equipamiento no homologado. FPS fuera de norma.",
    },
    {
      id: 16,
      playerId: 16,
      player: "StormBreaker",
      initials: "SB",
      avatarColor: "#4338ca",
      teamId: 4,
      team: "Delta Force",
      eventId: 3,
      event: "Asalto al Fuerte",
      eventDate: "07 Jun 2024",
      registrationDate: "22/05/2024",
      paymentStatus: "Pagado",
      status: "Confirmada",
      phone: "+34 667 666 777",
      email: "storm@airsoft.es",
    },
    {
      id: 17,
      playerId: 17,
      player: "ZeroKelvin",
      initials: "ZK",
      avatarColor: "#9f1239",
      teamId: 10,
      team: "Lone Wolves",
      eventId: 4,
      event: "Venganza",
      eventDate: "21 Jun 2024",
      registrationDate: "23/05/2024",
      paymentStatus: "Pendiente",
      status: "Pendiente",
      phone: "+34 678 777 888",
      email: "zerokelvin@proton.me",
    },
    {
      id: 18,
      playerId: 18,
      player: "EchoTango",
      initials: "ET",
      avatarColor: "#b45309",
      teamId: 6,
      team: "Ghost Recon",
      eventId: 5,
      event: "Blackout",
      eventDate: "05 Jul 2024",
      registrationDate: "24/05/2024",
      paymentStatus: "Pendiente",
      status: "Pendiente",
      phone: "+34 689 888 999",
      email: "echotango@mail.com",
    },
  ] as Registration[],

  teams: [
    {
      id: 1,
      name: "Escuadrón Alpha",
      acronym: "EA",
      color: "#1d4ed8",
      location: "Madrid",
      region: "Centro",
      captainId: 1,
      captain: "RaiderX",
      captainInitials: "RX",
      captainColor: "#1d4ed8",
      totalMembers: 12,
      events: 8,
      status: "Activo",
      founded: "2021",
      modality: "Milsim",
      contact: { phone: "+34 612 345 678", email: "alpha@airsoft.es" },
      description: "Equipo de élite especializado en operaciones Milsim de alta intensidad. Participan en los principales eventos nacionales con uniformes y equipo de nivel profesional.",
      wins: 5,
      members: [
        { id: 1, teamId: 1, playerId: 1, name: "RaiderX", role: "Capitán", initials: "RX", color: "#1d4ed8", joinedDate: "Ene 2021" },
        { id: 2, teamId: 1, playerId: 6, name: "OperativeLegend", role: "Suboficial", initials: "OL", color: "#15803d", joinedDate: "Mar 2021" },
        { id: 3, teamId: 1, playerId: 13, name: "ReconAlpha", role: "Francotirador", initials: "RA", color: "#0f766e", joinedDate: "Jun 2021" },
        { id: 4, teamId: 1, playerId: 16, name: "StormBreaker", role: "Médico", initials: "SB", color: "#4338ca", joinedDate: "Sep 2021" },
      ],
      recentEvents: [
        { teamId: 1, eventId: 1, name: "Operación Black Hawk", date: "24 May 2024", result: "Victoria" },
        { teamId: 1, eventId: 2, name: "Misión Red Dawn", date: "31 May 2024", result: "Victoria" },
        { teamId: 1, eventId: 3, name: "Asalto al Fuerte", date: "07 Jun 2024", result: "Participante" },
      ],
    },
    {
      id: 2,
      name: "Tácticos del Sur",
      acronym: "TS",
      color: "#7c3aed",
      location: "Sevilla",
      region: "Sur",
      captainId: 8,
      captain: "CobaltMike",
      captainInitials: "CM",
      captainColor: "#4338ca",
      totalMembers: 9,
      events: 5,
      status: "Activo",
      founded: "2022",
      modality: "CQB",
      contact: { phone: "+34 623 456 789", email: "tacticos@airsoft.es" },
      description: "Especialistas en combate urbano y CQB. Equipo dinámico con enfoque en partidas rápidas y alta rotación táctica.",
      wins: 3,
      members: [
        { id: 5, teamId: 2, playerId: 8, name: "CobaltMike", role: "Capitán", initials: "CM", color: "#4338ca", joinedDate: "Feb 2022" },
        { id: 6, teamId: 2, playerId: 3, name: "Viper45", role: "Asalto", initials: "V4", color: "#be185d", joinedDate: "Abr 2022" },
        { id: 7, teamId: 2, playerId: 15, name: "DarkMatter", role: "Apoyo", initials: "DM", color: "#c2410c", joinedDate: "Jul 2022" },
      ],
      recentEvents: [
        { teamId: 2, eventId: 7, name: "Misión Cobra", date: "02 Feb 2024", result: "Victoria" },
        { teamId: 2, eventId: 1, name: "Operación Black Hawk", date: "24 May 2024", result: "Derrota" },
      ],
    },
    {
      id: 3,
      name: "Airsoft Brothers",
      acronym: "AB",
      color: "#be185d",
      location: "Barcelona",
      region: "Cataluña",
      captainId: 2,
      captain: "Ghost_7",
      captainInitials: "G7",
      captainColor: "#7c3aed",
      totalMembers: 15,
      events: 11,
      status: "Activo",
      founded: "2019",
      modality: "Woodland",
      contact: { phone: "+34 634 567 890", email: "brothers@airsoft.es" },
      description: "Uno de los equipos más veteranos de Cataluña. Con más de 5 años de experiencia en Woodland y Milsim, compiten regularmente en las ligas autonómicas.",
      wins: 7,
      members: [
        { id: 8, teamId: 3, playerId: 2, name: "Ghost_7", role: "Capitán", initials: "G7", color: "#7c3aed", joinedDate: "Mar 2019" },
        { id: 9, teamId: 3, playerId: 9, name: "NightOwl", role: "Explorador", initials: "NO", color: "#0e7490", joinedDate: "Jun 2019" },
        { id: 10, teamId: 3, playerId: 11, name: "PhantomX", role: "Asalto", initials: "PX", color: "#1d4ed8", joinedDate: "Ago 2019" },
        { id: 11, teamId: 3, playerId: 12, name: "IronBull", role: "Soporte pesado", initials: "IB", color: "#7c3aed", joinedDate: "Ene 2020" },
      ],
      recentEvents: [
        { teamId: 3, eventId: 2, name: "Misión Red Dawn", date: "31 May 2024", result: "Victoria" },
        { teamId: 3, eventId: 8, name: "Asedio al Búnker", date: "10 Ene 2024", result: "Participante" },
        { teamId: 3, eventId: 6, name: "Operación Tormenta", date: "15 Mar 2024", result: "Victoria" },
      ],
    },
    {
      id: 4,
      name: "Delta Force",
      acronym: "DF",
      color: "#15803d",
      location: "Madrid",
      region: "Centro",
      captainId: 4,
      captain: "HunterK",
      captainInitials: "HK",
      captainColor: "#b45309",
      totalMembers: 11,
      events: 7,
      status: "Activo",
      founded: "2020",
      modality: "Milsim",
      contact: { phone: "+34 645 678 901", email: "deltaforce@airsoft.es" },
      description: "Equipo madrileño con fuerte disciplina táctica. Se especializan en operaciones nocturnas y escenarios de infiltración.",
      wins: 4,
      members: [
        { id: 12, teamId: 4, playerId: 4, name: "HunterK", role: "Capitán", initials: "HK", color: "#b45309", joinedDate: "Ene 2020" },
        { id: 13, teamId: 4, playerId: 5, name: "TacticalOne", role: "Médico", initials: "T1", color: "#0f766e", joinedDate: "Mar 2020" },
        { id: 14, teamId: 4, playerId: 14, name: "ViperStrike", role: "Francotirador", initials: "VS", color: "#15803d", joinedDate: "May 2020" },
        { id: 15, teamId: 4, playerId: 17, name: "ZeroKelvin", role: "Explorador", initials: "ZK", color: "#9f1239", joinedDate: "Ago 2020" },
      ],
      recentEvents: [
        { teamId: 4, eventId: 1, name: "Operación Black Hawk", date: "24 May 2024", result: "Victoria" },
        { teamId: 4, eventId: 10, name: "Noche de Lobos", date: "28 Abr 2024", result: "Participante" },
      ],
    },
    {
      id: 5,
      name: "Operative Legion",
      acronym: "OL",
      color: "#b45309",
      location: "Valencia",
      region: "Levante",
      captainId: 6,
      captain: "OperativeLegend",
      captainInitials: "OL",
      captainColor: "#15803d",
      totalMembers: 18,
      events: 13,
      status: "Activo",
      founded: "2018",
      modality: "Scenario",
      contact: { phone: "+34 656 789 012", email: "operative@airsoft.es" },
      description: "El equipo más grande y activo de la plataforma. Especializados en partidas de Scenario con narrativa compleja y uniformes personalizados.",
      wins: 9,
      members: [
        { id: 16, teamId: 5, playerId: 6, name: "OperativeLegend", role: "Capitán", initials: "OL", color: "#15803d", joinedDate: "May 2018" },
        { id: 17, teamId: 5, playerId: 7, name: "Sniper_44", role: "Francotirador", initials: "S4", color: "#c2410c", joinedDate: "Jul 2018" },
        { id: 18, teamId: 5, playerId: 18, name: "EchoTango", role: "Comunicaciones", initials: "ET", color: "#b45309", joinedDate: "Sep 2018" },
        { id: 19, teamId: 5, playerId: 10, name: "Bravo_Six", role: "Asalto", initials: "B6", color: "#9f1239", joinedDate: "Ene 2019" },
      ],
      recentEvents: [
        { teamId: 5, eventId: 3, name: "Asalto al Fuerte", date: "07 Jun 2024", result: "Victoria" },
        { teamId: 5, eventId: 4, name: "Venganza", date: "21 Jun 2024", result: "Victoria" },
        { teamId: 5, eventId: 6, name: "Operación Tormenta", date: "15 Mar 2024", result: "Derrota" },
      ],
    },
    {
      id: 6,
      name: "Shadow Wolves",
      acronym: "SW",
      color: "#0e7490",
      location: "Bilbao",
      region: "Norte",
      captainId: 9,
      captain: "NightOwl",
      captainInitials: "NO",
      captainColor: "#0e7490",
      totalMembers: 7,
      events: 4,
      status: "Pendiente",
      founded: "2023",
      modality: "Nocturno",
      contact: { phone: "+34 667 890 123", email: "shadow@airsoft.es" },
      description: "Equipo emergente del norte especializado en operaciones nocturnas. Su solicitud de membresía está pendiente de verificación.",
      wins: 1,
      members: [
        { id: 20, teamId: 6, playerId: 9, name: "NightOwl", role: "Capitán", initials: "NO", color: "#0e7490", joinedDate: "Feb 2023" },
        { id: 21, teamId: 6, playerId: 11, name: "PhantomX", role: "Asalto", initials: "PX", color: "#1d4ed8", joinedDate: "Feb 2023" },
        { id: 22, teamId: 6, playerId: 2, name: "Ghost_7", role: "Explorador", initials: "G7", color: "#7c3aed", joinedDate: "Mar 2023" },
      ],
      recentEvents: [{ teamId: 6, eventId: 5, name: "Blackout", date: "05 Jul 2024", result: "Participante" }],
    },
  ] as Team[],

  fields: [
    {
      id: 1,
      name: "Black Hawk Field",
      slug: "BHF",
      location: "Carretera A-7, km 42",
      city: "Valencia",
      region: "Levante",
      status: "Activo",
      availability: "Disponible",
      capacity: 40,
      modalities: ["CQB", "Woodland"],
      events: 12,
      reservations: 9,
      upcomingEvent: { fieldId: 1, eventId: 3, name: "Asalto al Fuerte", date: "07 Jun 2024", enrolled: 20, capacity: 40 },
      managerId: 1,
      manager: "Carlos Ortega",
      managerPhone: "+34 612 111 222",
      managerEmail: "carlos@blackhawkfield.es",
      area: "18.000 m²",
      founded: "2020",
      description: "Campo mixto con zona CQB interior y zona Woodland exterior. Instalaciones de primer nivel con vestuarios, área de crónica y parking. Homologado para competición regional.",
      img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&h=220&fit=crop&auto=format",
    },
    {
      id: 2,
      name: "Delta Base",
      slug: "DB",
      location: "Ctra. M-600, km 12",
      city: "Madrid",
      region: "Centro",
      status: "Activo",
      availability: "Reservado",
      capacity: 60,
      modalities: ["Woodland", "Milsim"],
      events: 8,
      reservations: 6,
      upcomingEvent: { fieldId: 2, eventId: 1, name: "Operación Black Hawk", date: "24 May 2024", enrolled: 48, capacity: 60 },
      managerId: 2,
      manager: "Marta Sánchez",
      managerPhone: "+34 623 333 444",
      managerEmail: "marta@deltabase.es",
      area: "32.000 m²",
      founded: "2019",
      description: "El campo más grande de la Comunidad de Madrid. Terreno natural de bosque mediterráneo con estructuras permanentes para Milsim y grandes operaciones de día completo.",
      img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=220&fit=crop&auto=format",
    },
    {
      id: 3,
      name: "Campo Alpha",
      slug: "CA",
      location: "Polígono Industrial Nord, nave 7",
      city: "Barcelona",
      region: "Cataluña",
      status: "Activo",
      availability: "Ocupado por evento",
      capacity: 50,
      modalities: ["CQB", "Speedsoft"],
      events: 11,
      reservations: 10,
      upcomingEvent: { fieldId: 3, eventId: 2, name: "Misión Red Dawn", date: "31 May 2024", enrolled: 35, capacity: 50 },
      managerId: 3,
      manager: "Pau Ferrer",
      managerPhone: "+34 634 555 666",
      managerEmail: "pau@campoalpha.es",
      area: "4.200 m²",
      founded: "2021",
      description: "Campo indoor de alta especificidad para CQB y Speedsoft. Escenarios modulares intercambiables, iluminación LED táctica y sistema de música ambiental para inmersión total.",
      img: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=400&h=220&fit=crop&auto=format",
    },
    {
      id: 4,
      name: "Campo Omega",
      slug: "CO",
      location: "Finca El Olivar, salida 104",
      city: "Toledo",
      region: "Centro",
      status: "Activo",
      availability: "Disponible",
      capacity: 50,
      modalities: ["Milsim", "Scenario"],
      events: 4,
      reservations: 3,
      upcomingEvent: { fieldId: 4, eventId: 4, name: "Venganza", date: "21 Jun 2024", enrolled: 15, capacity: 30 },
      managerId: 4,
      manager: "Javier Molina",
      managerPhone: "+34 645 777 888",
      managerEmail: "javier@campoOmega.es",
      area: "25.000 m²",
      founded: "2022",
      description: "Campo de Scenario con narrativa ambiental propia. Vehículos militares retirados, estructuras de hormigón y zonas de bosque crean escenarios únicos para operaciones de larga duración.",
      img: "https://images.unsplash.com/photo-1465447142348-e9952c393450?w=400&h=220&fit=crop&auto=format",
    },
    {
      id: 5,
      name: "Campo Norte",
      slug: "CN",
      location: "Polígono Txorierri, carretera BI-3713",
      city: "Bilbao",
      region: "Norte",
      status: "Activo",
      availability: "Disponible",
      capacity: 70,
      modalities: ["Woodland", "Nocturno", "Milsim"],
      events: 6,
      reservations: 4,
      upcomingEvent: null,
      managerId: 5,
      manager: "Ainhoa Etxebarria",
      managerPhone: "+34 656 888 999",
      managerEmail: "ainhoa@camponorte.es",
      area: "28.000 m²",
      founded: "2021",
      description: "Gran campo al norte con terreno variado: zona boscosa densa, pradera abierta y estructuras de madera. Ideal para operaciones nocturnas y eventos de fin de semana.",
      img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=220&fit=crop&auto=format",
    },
    {
      id: 6,
      name: "Campo Base Sur",
      slug: "CBS",
      location: "Camino Rural de Coria, km 8",
      city: "Valencia",
      region: "Levante",
      status: "Activo",
      availability: "Disponible",
      capacity: 60,
      modalities: ["CQB", "Milsim", "Nocturno"],
      events: 3,
      reservations: 1,
      upcomingEvent: { fieldId: 6, eventId: 5, name: "Blackout", date: "05 Jul 2024", enrolled: 0, capacity: 50 },
      managerId: 6,
      manager: "Sergio Llopis",
      managerPhone: "+34 667 999 000",
      managerEmail: "sergio@basesurvlc.es",
      area: "20.000 m²",
      founded: "2023",
      description: "Campo reciente con diseño híbrido. Bunkers de hormigón, trincheras excavadas y zona urbana simulada. Especializado en partidas nocturnas con efectos de luz y sonido.",
      img: "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=400&h=220&fit=crop&auto=format",
    },
    {
      id: 7,
      name: "Campo Sur",
      slug: "CS",
      location: "Finca La Marisma, carretera SE-3401",
      city: "Sevilla",
      region: "Sur",
      status: "Mantenimiento",
      availability: "Reservado",
      capacity: 45,
      modalities: ["Woodland", "Scenario"],
      events: 7,
      reservations: 0,
      upcomingEvent: null,
      managerId: 7,
      manager: "Antonio Rueda",
      managerPhone: "+34 678 000 111",
      managerEmail: "antonio@camposur.es",
      area: "22.000 m²",
      founded: "2020",
      description: "Campo andaluz con terreno mixto de marisma y bosque. Actualmente en mantenimiento para renovación de instalaciones. Se espera reabertura en verano 2024.",
      img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=220&fit=crop&auto=format",
    },
  ] as Field[],

  players: [
    { id: 1, username: "RaiderX", initials: "RX", avatarColor: "#1d4ed8", email: "raiderx@airsoft.es", phone: "+34 612 345 678", teamId: 4 },
    { id: 2, username: "Ghost_7", initials: "G7", avatarColor: "#7c3aed", email: "ghost7@mail.com", phone: "+34 623 456 789", teamId: 3 },
    { id: 3, username: "Viper45", initials: "V4", avatarColor: "#be185d", email: "viper45@gmail.com", phone: "+34 634 567 890", teamId: 2 },
    { id: 4, username: "HunterK", initials: "HK", avatarColor: "#b45309", email: "hunterk@airmail.es", phone: "+34 645 678 901", teamId: 6 },
    { id: 5, username: "TacticalOne", initials: "T1", avatarColor: "#0f766e", email: "t1ops@outlook.com", phone: "+34 656 789 012", teamId: 7 },
    { id: 6, username: "OperativeLegend", initials: "OL", avatarColor: "#15803d", email: "oplegend@airsoft.es", phone: "+34 667 890 123", teamId: 4 },
    { id: 7, username: "Sniper_44", initials: "S4", avatarColor: "#c2410c", email: "sniper44@proton.me", phone: "+34 678 901 234", teamId: 8 },
    { id: 8, username: "CobaltMike", initials: "CM", avatarColor: "#4338ca", email: "cobaltmike@mail.es", phone: "+34 689 012 345", teamId: 9 },
    { id: 9, username: "NightOwl", initials: "NO", avatarColor: "#0e7490", email: "nightowl@gmail.com", phone: "+34 690 123 456", teamId: 10 },
    { id: 10, username: "Bravo_Six", initials: "B6", avatarColor: "#9f1239", email: "bravo6@airsoft.es", phone: "+34 601 234 567", teamId: 6 },
    { id: 11, username: "PhantomX", initials: "PX", avatarColor: "#1d4ed8", email: "phantomx@mail.com", phone: "+34 612 111 222", teamId: 3 },
    { id: 12, username: "IronBull", initials: "IB", avatarColor: "#7c3aed", email: "ironbull@airsoft.es", phone: "+34 623 222 333", teamId: 2 },
    { id: 13, username: "ReconAlpha", initials: "RA", avatarColor: "#0f766e", email: "reconalpha@gmail.com", phone: "+34 634 333 444", teamId: 8 },
    { id: 14, username: "ViperStrike", initials: "VS", avatarColor: "#15803d", email: "viperstrike@mail.es", phone: "+34 645 444 555", teamId: 7 },
    { id: 15, username: "DarkMatter", initials: "DM", avatarColor: "#c2410c", email: "darkmatter@outlook.com", phone: "+34 656 555 666", teamId: 9 },
    { id: 16, username: "StormBreaker", initials: "SB", avatarColor: "#4338ca", email: "storm@airsoft.es", phone: "+34 667 666 777", teamId: 4 },
    { id: 17, username: "ZeroKelvin", initials: "ZK", avatarColor: "#9f1239", email: "zerokelvin@proton.me", phone: "+34 678 777 888", teamId: 10 },
    { id: 18, username: "EchoTango", initials: "ET", avatarColor: "#b45309", email: "echotango@mail.com", phone: "+34 689 888 999", teamId: 6 },
  ] as Player[],
};

const ARGENTINA_CITIES = ["La Plata", "Córdoba", "Rosario", "Santa Fe", "Mendoza", "Mar del Plata", "CABA"];
const ARGENTINA_REGIONS = ["Buenos Aires", "Córdoba", "Santa Fe", "Mendoza", "Entre Ríos", "CABA"];
const EVENT_DATES: Record<number, { date: string; dateSort: string }> = {
  1: { date: "24/10/2026", dateSort: "2026-10-24" },
  2: { date: "31/10/2026", dateSort: "2026-10-31" },
  3: { date: "07/11/2026", dateSort: "2026-11-07" },
  4: { date: "21/11/2026", dateSort: "2026-11-21" },
  5: { date: "05/12/2026", dateSort: "2026-12-05" },
  6: { date: "15/08/2026", dateSort: "2026-08-15" },
  7: { date: "02/07/2026", dateSort: "2026-07-02" },
  8: { date: "10/06/2026", dateSort: "2026-06-10" },
  9: { date: "18/09/2026", dateSort: "2026-09-18" },
  10: { date: "28/09/2026", dateSort: "2026-09-28" },
};
const EVENT_PRICES: Record<number, number> = { 1: 35000, 2: 30000, 3: 28000, 4: 35000, 5: 40000, 6: 45000, 7: 30000, 8: 35000, 9: 35000, 10: 40000 };
const ARGENTINA_PHONES = ["+54 9 11 5555 0101", "+54 9 351 555 0122", "+54 9 341 555 0133", "+54 9 261 555 0144", "+54 9 342 555 0155", "+54 9 223 555 0166"];

function localizeSeedData(): void {
  const fieldNames: Record<number, string> = {
    1: "Campo Delta",
    2: "Campo Delta Base",
    3: "Campo Alpha",
    4: "Campo Omega",
    5: "Campo Norte",
    6: "Campo Base Sur",
    7: "Campo Sur",
  };
  const cityByField: Record<number, string> = {
    1: "La Plata",
    2: "Pilar",
    3: "Córdoba",
    4: "Rosario",
    5: "Santa Fe",
    6: "Mendoza",
    7: "Mar del Plata",
  };
  const regionByField: Record<number, string> = {
    1: "Buenos Aires",
    2: "Buenos Aires",
    3: "Córdoba",
    4: "Santa Fe",
    5: "Santa Fe",
    6: "Mendoza",
    7: "Buenos Aires",
  };

  seedData.fields.forEach((field) => {
    field.name = fieldNames[field.id];
    field.city = cityByField[field.id];
    field.region = regionByField[field.id];
    field.location = [
      "Acceso por Ruta Provincial 25, km 4",
      "Zona Industrial Pilar, acceso norte",
      "Camino Rural Los Aromos, Córdoba",
      "Parque Industrial Oeste, Rosario",
      "Acceso Norte, Santa Fe",
      "Camino de los Viñedos, Mendoza",
      "Finca Los Acantilados, Mar del Plata",
    ][field.id - 1];
    field.managerPhone = ARGENTINA_PHONES[(field.id - 1) % ARGENTINA_PHONES.length];
    field.managerEmail = `${field.manager.toLowerCase().replace(/\s+/g, ".")}@airsoft.com.ar`;
    if (field.upcomingEvent) {
      const localizedDate = EVENT_DATES[field.upcomingEvent.eventId];
      if (localizedDate) field.upcomingEvent.date = localizedDate.date;
    }
  });

  seedData.events.forEach((event) => {
    const localizedDate = EVENT_DATES[event.id];
    const field = seedData.fields.find((item) => item.id === event.fieldId);
    if (localizedDate) {
      event.date = localizedDate.date;
      event.dateSort = localizedDate.dateSort;
    }
    if (field) {
      event.field = field.name;
      event.city = field.city;
    }
    event.price = EVENT_PRICES[event.id];
    event.revenue = event.status === "Publicado" || event.status === "Finalizado" ? event.enrolled * event.price : 0;
  });

  seedData.registrations.forEach((registration, index) => {
    const eventDate = EVENT_DATES[registration.eventId];
    if (eventDate) registration.eventDate = eventDate.date;
    registration.registrationDate = `${String(5 + (index % 20)).padStart(2, "0")}/09/2026`;
    registration.phone = ARGENTINA_PHONES[index % ARGENTINA_PHONES.length];
    registration.email = `${registration.player.toLowerCase().replace(/_/g, ".")}@airsoft.com.ar`;
  });

  seedData.teams.forEach((team, index) => {
    team.location = ARGENTINA_CITIES[index % ARGENTINA_CITIES.length];
    team.region = ARGENTINA_REGIONS[index % ARGENTINA_REGIONS.length];
    team.contact.phone = ARGENTINA_PHONES[index % ARGENTINA_PHONES.length];
    team.contact.email = `${team.name.toLowerCase().replace(/\s+/g, ".")}@airsoft.com.ar`;
    team.description = team.description
      .replace("Cataluña", "Santa Fe")
      .replace("madrileño", "bonaerense")
      .replace("del norte", "de Mendoza")
      .replace("ligas autonómicas", "ligas regionales");
    team.recentEvents.forEach((teamEvent) => {
      const localizedDate = EVENT_DATES[teamEvent.eventId];
      if (localizedDate) teamEvent.date = localizedDate.date;
    });
  });

  seedData.players.forEach((player, index) => {
    player.phone = ARGENTINA_PHONES[index % ARGENTINA_PHONES.length];
    player.email = `${player.username.toLowerCase().replace(/_/g, ".")}@airsoft.com.ar`;
  });
}

localizeSeedData();

const LOCALIZATION_VERSION = "argentina-2026-09";

function mergeLocalizedCollection<T extends { id: number }>(key: string, localize: (item: T) => Partial<T>): void {
  const raw = localStorage.getItem(key);
  if (!raw) return;

  try {
    const storedItems = JSON.parse(raw) as T[];
    localStorage.setItem(
      key,
      JSON.stringify(storedItems.map((item) => ({ ...item, ...localize(item) })))
    );
  } catch {
    localStorage.removeItem(key);
  }
}

function mergeLocalizedStore<T extends { id: number }>(key: string, property: string, localize: (item: T) => Partial<T>): void {
  const raw = localStorage.getItem(key);
  if (!raw) return;

  try {
    const storedState = JSON.parse(raw) as { state?: Record<string, T[]> };
    const items = storedState.state?.[property];
    if (!items) return;

    storedState.state![property] = items.map((item) => ({ ...item, ...localize(item) }));
    localStorage.setItem(key, JSON.stringify(storedState));
  } catch {
    localStorage.removeItem(key);
  }
}

function migrateExistingMockData(): void {
  if (localStorage.getItem("airsoft-localization-version") === LOCALIZATION_VERSION) return;

  const localizedEventById = new Map(seedData.events.map((event) => [event.id, event]));
  const localizedRegistrationById = new Map(seedData.registrations.map((registration) => [registration.id, registration]));
  const localizedTeamById = new Map(seedData.teams.map((team) => [team.id, team]));
  const localizedFieldById = new Map(seedData.fields.map((field) => [field.id, field]));
  const localizedPlayerById = new Map(seedData.players.map((player) => [player.id, player]));

  const localizeEvent = (event: Event): Partial<Event> => {
    const localized = localizedEventById.get(event.id);
    return localized ? { date: localized.date, dateSort: localized.dateSort, field: localized.field, city: localized.city, price: localized.price, revenue: localized.revenue } : {};
  };
  const localizeRegistration = (registration: Registration): Partial<Registration> => {
    const localized = localizedRegistrationById.get(registration.id);
    return localized ? { eventDate: localized.eventDate, registrationDate: localized.registrationDate, phone: localized.phone, email: localized.email } : {};
  };
  const localizeTeam = (team: Team): Partial<Team> => {
    const localized = localizedTeamById.get(team.id);
    return localized ? { location: localized.location, region: localized.region, contact: localized.contact, description: localized.description, recentEvents: localized.recentEvents } : {};
  };
  const localizeField = (field: Field): Partial<Field> => {
    const localized = localizedFieldById.get(field.id);
    return localized ? { location: localized.location, city: localized.city, region: localized.region, managerPhone: localized.managerPhone, managerEmail: localized.managerEmail, upcomingEvent: localized.upcomingEvent, description: localized.description } : {};
  };
  const localizePlayer = (player: Player): Partial<Player> => {
    const localized = localizedPlayerById.get(player.id);
    return localized ? { phone: localized.phone, email: localized.email } : {};
  };

  mergeLocalizedCollection("events", localizeEvent);
  mergeLocalizedCollection("registrations", localizeRegistration);
  mergeLocalizedCollection("teams", localizeTeam);
  mergeLocalizedCollection("fields", localizeField);
  mergeLocalizedCollection("players", localizePlayer);
  mergeLocalizedStore("event-storage", "events", localizeEvent);
  mergeLocalizedStore("registration-storage", "registrations", localizeRegistration);
  mergeLocalizedStore("team-storage", "teams", localizeTeam);
  mergeLocalizedStore("field-storage", "fields", localizeField);
  localStorage.setItem("airsoft-localization-version", LOCALIZATION_VERSION);
}

export function initializeSeedData(): void {
  migrateExistingMockData();
  if (!localStorage.getItem("events")) {
    localStorage.setItem("events", JSON.stringify(seedData.events));
  }
  if (!localStorage.getItem("registrations")) {
    localStorage.setItem("registrations", JSON.stringify(seedData.registrations));
  }
  if (!localStorage.getItem("teams")) {
    localStorage.setItem("teams", JSON.stringify(seedData.teams));
  }
  if (!localStorage.getItem("fields")) {
    localStorage.setItem("fields", JSON.stringify(seedData.fields));
  }
  if (!localStorage.getItem("players")) {
    localStorage.setItem("players", JSON.stringify(seedData.players));
  }
}
