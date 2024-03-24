export const estimateCost = async (token: string) => {
    const headers = { 'Authorization': `Bearer ${token}` };

    const volumesRsp = await fetch('https://api.hetzner.cloud/v1/volumes', { method: 'GET', headers });
    const serversRsp = await fetch('https://api.hetzner.cloud/v1/servers', { method: 'GET', headers });
    const [volumes, servers] = await Promise.all([
        <Promise<VolumesApiRsp>>(volumesRsp.json()),
        <Promise<ServersApiRsp>>(serversRsp.json()),
    ]);

    console.log('ret: ', servers);
    console.log('ret: ', volumes);

    let price = 0;
    servers.servers?.forEach(x => {
        const prices = x.server_type?.prices?.filter(y => y.location === x.datacenter?.location?.name);
        if (prices?.length) {
            price += parseFloat(prices[0].price_monthly?.net || '0');
        }
    });
    console.log('price: ', price);
    return price;
};


// Created by ChatGPT
class ActionsApiRsp {
    actions?: Action[];
    meta?: Meta;
}

class VolumesApiRsp {
    volumes?: Volume[];
    meta?: Meta;
}

class ServersApiRsp {
    servers?: Server[];
    meta?: Meta;
}

class Resource {
    id?: number;
    type?: string;
}

class Action {
    id?: number;
    command?: string;
    status?: string;
    progress?: number;
    started?: string;
    finished?: string;
    resources?: Resource[];
    error?: any;
}

class Volume {
    created?: string;
    format?: any;
    id?: number;
    labels?: any;
    linux_device?: string;
    location?: Location;
    name?: string;
    protection?: Protection;
    server?: number;
    size?: number;
    status?: string;
}

class IPv4 {
    ip?: string;
    blocked?: boolean;
    dns_ptr?: string;
    id?: number;
}

class IPv6 {
    ip?: string;
    blocked?: boolean;
    dns_ptr?: string[];
    id?: number;
}

class Firewall {
    id?: number;
    status?: string;
}

class PublicNet {
    ipv4?: IPv4;
    ipv6?: IPv6;
    floating_ips?: any[];
    firewalls?: Firewall[];
}

class PrivateNet {
    network?: number;
    ip?: string;
    alias_ips?: any[];
    mac_address?: string;
}

class PriceHourly {
    net?: string;
    gross?: string;
}

class PriceMonthly {
    net?: string;
    gross?: string;
}

class Price {
    location?: string;
    price_hourly?: PriceHourly;
    price_monthly?: PriceMonthly;
}

class ServerType {
    id?: number;
    name?: string;
    description?: string;
    cores?: number;
    memory?: number;
    disk?: number;
    deprecated?: boolean;
    prices?: Price[];
    storage_type?: string;
    cpu_type?: string;
    architecture?: string;
    included_traffic?: number;
    deprecation?: any;
}

class Location {
    id?: number;
    name?: string;
    description?: string;
    country?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
    network_zone?: string;
}

class ServerTypes {
    supported?: number[];
    available?: number[];
    available_for_migration?: number[];
}

class Datacenter {
    id?: number;
    name?: string;
    description?: string;
    location?: Location;
    server_types?: ServerTypes;
}

class Image {
    id?: number;
    type?: string;
    status?: string;
    name?: string;
    description?: string;
    image_size?: any;
    disk_size?: number;
    created?: string;
    created_from?: any;
    bound_to?: any;
    os_flavor?: string;
    os_version?: string;
    rapid_deploy?: boolean;
    protection?: Protection;
    deprecated?: any;
    labels?: any;
    deleted?: any;
    architecture?: string;
}

class Protection {
    delete?: boolean;
    rebuild?: boolean;
}

class PlacementGroup {
    id?: number;
    name?: string;
    labels?: any;
    type?: string;
    created?: string;
    servers?: number[];
}

class Server {
    id?: number;
    name?: string;
    status?: string;
    created?: string;
    public_net?: PublicNet;
    private_net?: PrivateNet[];
    server_type?: ServerType;
    datacenter?: Datacenter;
    image?: Image;
    iso?: any;
    rescue_enabled?: boolean;
    locked?: boolean;
    backup_window?: any;
    outgoing_traffic?: number;
    ingoing_traffic?: number;
    included_traffic?: number;
    protection?: Protection;
    labels?: Labels;
    volumes?: number[];
    load_balancers?: any[];
    primary_disk_size?: number;
    placement_group?: PlacementGroup;
}

class Labels {
    role?: string;
    cluster?: string;
}

class Pagination {
    page?: number;
    per_page?: number;
    previous_page?: any;
    next_page?: any;
    last_page?: number;
    total_entries?: number;
}

class Meta {
    pagination?: Pagination;
}
