export interface TechStackItem {
  name: string;
  url: string;
  icon: string;
}

export interface TechStackCategory {
  id: "development" | "infrastructure" | "observability";
  items: TechStackItem[];
}

export const techStackCategories: TechStackCategory[] = [
  {
    id: "development",
    items: [
      { name: "React", url: "https://react.dev", icon: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Tailwind CSS", url: "https://tailwindcss.com", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
      { name: "Python", url: "https://www.python.org", icon: "https://cdn.simpleicons.org/python/3776AB" },
      { name: "Rust", url: "https://www.rust-lang.org", icon: "https://cdn.simpleicons.org/rust/DEA584" },
      { name: "FastAPI", url: "https://fastapi.tiangolo.com", icon: "https://cdn.simpleicons.org/fastapi/009688" },
      { name: "PostgreSQL", url: "https://www.postgresql.org", icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
      { name: "Postman", url: "https://www.postman.com", icon: "https://cdn.simpleicons.org/postman/FF6C37" },
      { name: "Cursor", url: "https://cursor.com", icon: "https://cdn.simpleicons.org/cursor/000000" },
    ],
  },
  {
    id: "observability",
    items: [
      { name: "Zeek", url: "https://zeek.org", icon: "/icons/zeek.png" },
      { name: "Elasticsearch", url: "https://www.elastic.co/elasticsearch", icon: "https://cdn.simpleicons.org/elasticsearch/005571" },
      { name: "Zabbix", url: "https://www.zabbix.com", icon: "/icons/zabbix.svg" },
    ],
  },
  {
    id: "infrastructure",
    items: [
      { name: "Docker", url: "https://www.docker.com", icon: "https://cdn.simpleicons.org/docker/2496ED" },
      { name: "Kubernetes", url: "https://kubernetes.io", icon: "https://cdn.simpleicons.org/kubernetes/326CE5" },
      { name: "GitHub Actions", url: "https://github.com/features/actions", icon: "https://cdn.simpleicons.org/githubactions/2088FF" },
      { name: "AWS", url: "https://aws.amazon.com", icon: "/icons/aws.svg" },
      { name: "OVH", url: "https://www.ovhcloud.com", icon: "https://cdn.simpleicons.org/ovh/123F6D" },
      { name: "Oracle Cloud", url: "https://www.oracle.com/cloud/", icon: "/icons/oracle.svg" },
      { name: "Cloudflare", url: "https://www.cloudflare.com", icon: "https://cdn.simpleicons.org/cloudflare/F38020" },
      { name: "Traefik", url: "https://traefik.io", icon: "/icons/traefik.svg" },
      { name: "Nginx", url: "https://nginx.org", icon: "https://cdn.simpleicons.org/nginx/009639" },
      { name: "n8n", url: "https://n8n.io", icon: "https://cdn.simpleicons.org/n8n/EA4B71" },
      { name: "Apigee", url: "https://cloud.google.com/apigee", icon: "/icons/apigee.svg" },
      { name: "Keycloak", url: "https://www.keycloak.org", icon: "https://cdn.simpleicons.org/keycloak/4D4D4D" },
      { name: "Stripe", url: "https://stripe.com", icon: "https://cdn.simpleicons.org/stripe/635BFF" },
      { name: "OpenClaw", url: "https://nemoclaw.mariodepablo.es", icon: "/icons/openclaw.svg" },
    ],
  },
];

export interface TechStackCloudItem {
  name: string;
  icon: string;
}

export const techStackCloudItems: TechStackCloudItem[] = techStackCategories.flatMap(
  (category) => category.items.map((item) => ({ name: item.name, icon: item.icon }))
);

/** @deprecated Use techStackCloudItems */
export const techStackImages = techStackCloudItems.map((item) => item.icon);
