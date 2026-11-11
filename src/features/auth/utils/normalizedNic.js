
export const normalizedNic = (nic) => {
    return String(nic ?? '').trim().toUpperCase();
}