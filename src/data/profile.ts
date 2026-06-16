/** Fuente única de datos personales y de contacto */
export const profile = {
  fullName: "Mario de Pablo Damián",
  email: "mariodepablo2005@gmail.com",
  phone: {
    tel: "+34683127718",
    display: "+34 683 127 718",
  },
  siteUrl: "https://mariodepablo.es",
  links: {
    linkedin: "https://www.linkedin.com/in/mario-de-pablo-damian/",
    github: "https://github.com/Mariosos1",
    maps: "https://www.google.com/maps/place/28521+Rivas-Vaciamadrid,+Madrid",
    openclaw: "https://openclaw.mariodepablo.es/",
  },
  address: {
    locality: "Rivas-Vaciamadrid",
    region: "Madrid",
    postalCode: "28521",
    country: "ES",
  },
  employer: {
    name: "CIVIR",
  },
} as const;

export const mailto = `mailto:${profile.email}` as const;
