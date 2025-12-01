// 1. Define the Devices
const nodesArray = [
    { id: 1, label: 'Internet', shape: 'image', image: 'https://img.icons8.com/color/48/cloud.png' },
    { id: 2, label: 'Router', shape: 'image', image: 'https://img.icons8.com/color/48/router.png' },
    { id: 3, label: 'Switch', shape: 'image', image: 'https://img.icons8.com/color/48/switch.png' },
    { id: 4, label: 'Server', shape: 'image', image: 'https://img.icons8.com/color/48/server.png' },
    { id: 5, label: 'Admin PC', shape: 'image', image: 'https://img.icons8.com/color/48/workstation.png' },
    { id: 6, label: 'WiFi AP', shape: 'image', image: 'https://img.icons8.com/color/48/wireless-router.png' },
    { id: 7, label: 'Guest', shape: 'image', image: 'https://img.icons8.com/color/48/laptop--v1.png' }
];

// 2. Define the Connections
const edgesArray = [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 3, to: 5 },
    { from: 2, to: 6, dashes: true, label: "WiFi" },
    { from: 6, to: 7, dashes: true }
];

// 3. Device Data
const deviceData = {
 1: { ip: "8.8.8.8", mac: "N/A", type: "WAN", info: "Its the internet..."},
    2: { ip: "192.168.1.1", mac: "00:1A:2B:3C:4D:5E", type: "Cisco 2901", info: "This is the Router, it allows for all devices to connect to the internet via it, some models also allow for wired and wireless connections without relying on a seperate wireless router." },
    3: { ip: "192.168.1.2", mac: "00:1A:2B:3C:4D:5F", type: "Layer 2 Switch", info: "The switch allows for multiple wired connections to lots of devices, such as a printer, server, PC, cameras and more. It allows the devices to use a wired connection without using all ports on the router." },
    4: { ip: "192.168.1.10", mac: "AA:BB:CC:DD:EE:FF", type: "Ubuntu Server", info: "The server allows for storing of information, databases and much more. This can be connected either locally via a LAN setup or allowed access to the internet via a WAN, which is what is happening while it is connected to the Switch." },
    5: { ip: "192.168.1.101", mac: "11:22:33:44:55:66", type: "Windows 11", info: "The Admin PC has full access to the server and the connection settings for the router, it is basically a big control panel for everything connected to the network, it can set devices to just use a LAN or to be allowed access to a WAN."},
    6: { ip: "192.168.2.1", mac: "99:88:77:66:55:44", type: "Access Point", info: "This is a wireless connection, what basically everything uses today, Your phone, Laptop, and probably your oven."},
    7: { ip: "192.168.2.15", mac: "AB:CD:EF:12:34:56", type: "Mobile Device", info: "This is your average wireless device, it could be your phone, laptop, or your oven, it connects using Wi-Fi (Fun Fact: It doesnt stand for Wireless Fidelity, they just wanted something Catchy like Hi-Fi in audio equipment) to the router, then to the internet, allowing you to watch all your cat videos or stream your music all day long." }
};

// 4. Initialize Network
const container = document.getElementById('mynetwork');
const data = { nodes: new vis.DataSet(nodesArray), edges: new vis.DataSet(edgesArray) };
const options = {
    nodes: { borderWidth: 2, font: { color: '#eeeeee' }, size: 30 },
    edges: { width: 2, color: { color: '#555555' }, smooth: { type: 'continuous' } },
    physics: { enabled: true, stabilization: false },
    interaction: { hover: true }
};
const network = new vis.Network(container, data, options);

// --- ANIMATION LOGIC ---

let packets = []; 

// The Drawing Loop
network.on("afterDrawing", function (ctx) {
    for (let i = packets.length - 1; i >= 0; i--) {
        let packet = packets[i];
        
        // Get positions - FORCE INTEGER IDs
        const nodeA_Id = parseInt(packet.from);
        const nodeB_Id = parseInt(packet.to);
        
        const positions = network.getPositions([nodeA_Id, nodeB_Id]);
        const nodeA = positions[nodeA_Id];
        const nodeB = positions[nodeB_Id];

        if (!nodeA || !nodeB) {
            console.error("Node not found:", nodeA_Id, nodeB_Id);
            packets.splice(i, 1); 
            continue; 
        }

        // Calculate position
        const x = nodeA.x + (nodeB.x - nodeA.x) * packet.progress;
        const y = nodeA.y + (nodeB.y - nodeA.y) * packet.progress;

        // Draw Packet
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 2 * Math.PI, false);
        ctx.fillStyle = "#00FF00"; // Green Dot
        ctx.fill();
        ctx.strokeStyle = "#000";
        ctx.stroke();

        // Update progress (Slower speed: 0.015)
        packet.progress += 0.015;

        if (packet.progress >= 1.0) {
            packets.splice(i, 1);
        }
    }
    
    if (packets.length > 0) {
        network.redraw();
    }
});

// Global function to start ping
window.startPing = function(fromId, toId) {
    console.log(`Ping started from ${fromId} to ${toId}`); // Debug Log
    packets.push({ from: parseInt(fromId), to: parseInt(toId), progress: 0.0 });
    network.redraw();
};

// 5. Handle Click Events
network.on("click", function (params) {
    const panel = document.getElementById('detail-content');
    
    if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        const device = deviceData[nodeId];
        
        // Logic: If Router(2) -> Ping Internet(1). Else -> Ping Router(2)
        const targetId = (nodeId === 2) ? 1 : 2;
        const buttonText = (nodeId === 2) ? "Ping Internet" : "Ping Gateway";
        
        // Safety check for description
        const description = device.info ? device.info : "No details available.";

        panel.innerHTML = `
            <p><strong>Device:</strong> ${device.type}</p>
            <p><strong>IP:</strong> ${device.ip}</p>
            <hr style="border-color: #0f0;">
            <p style="font-size: 0.9rem; color: #ddd;">${description}</p>
            <br>
            <button onclick="startPing(${nodeId}, ${targetId})" class="retro-btn">
                ${buttonText}
            </button>
        `;
    } else {
        panel.innerHTML = `<p><strong>Status:</strong> Select a device...</p>`;
    }
});