const glossaryData = [
    // --- ATTACKS ---
    { term: "DDoS", tag: "Attack", def: "Distributed Denial of Service. Overwhelming a target with traffic from multiple sources." },
    { term: "Phishing", tag: "Social Eng", def: "Deceptive emails designed to trick users into revealing sensitive info." },
    { term: "Spear Phishing", tag: "Social Eng", def: "Targeted phishing attack aimed at specific individuals or organizations." },
    { term: "Whaling", tag: "Social Eng", def: "Phishing attack targeting high-profile executives (the 'whales')." },
    { term: "SQL Injection", tag: "Attack", def: "Inserting malicious SQL code into input fields to manipulate a database." },
    { term: "XSS", tag: "Attack", def: "Cross-Site Scripting. Injecting malicious scripts into trusted websites viewed by others." },
    { term: "Man-in-the-Middle", tag: "Attack", def: "An attacker secretly intercepts and relays communications between two parties." },
    { term: "Brute Force", tag: "Attack", def: "Trial-and-error method of guessing passwords by trying every combination." },
    { term: "Dictionary Attack", tag: "Attack", def: "Guessing passwords using a list of common words or phrases." },
    { term: "Zero Day", tag: "Vuln", def: "A vulnerability known to attackers before the vendor has patched it." },
    { term: "Rainbow Table", tag: "Attack", def: "A precomputed table for caching the output of cryptographic hash functions, used for cracking password hashes." },

    // --- MALWARE ---
    { term: "Malware", tag: "Malware", def: "Umbrella term for malicious software (viruses, worms, trojans, etc.)." },
    { term: "Ransomware", tag: "Malware", def: "Encrypts files and demands payment for the decryption key." },
    { term: "Trojan Horse", tag: "Malware", def: "Malware disguised as legitimate software." },
    { term: "Worm", tag: "Malware", def: "Self-replicating malware that spreads across networks without user interaction." },
    { term: "Rootkit", tag: "Malware", def: "Software designed to hide the existence of other malware/processes from the OS." },
    { term: "Keylogger", tag: "Spyware", def: "Records every keystroke made by a user to steal passwords/chats." },
    { term: "Spyware", tag: "Malware", def: "Software that secretly gathers user information." },
    { term: "Logic Bomb", tag: "Malware", def: "Malicious code set to execute only when specific conditions are met." },

    // --- DEFENSE & TOOLS ---
    { term: "Firewall", tag: "Defense", def: "Network security device that monitors traffic based on security rules." },
    { term: "VPN", tag: "Tool", def: "Virtual Private Network. Creates an encrypted tunnel for internet traffic." },
    { term: "IDS", tag: "Defense", def: "Intrusion Detection System. Monitors network traffic for suspicious activity." },
    { term: "IPS", tag: "Defense", def: "Intrusion Prevention System. Detects and actively blocks threats." },
    { term: "Honeypot", tag: "Defense", def: "A decoy system set up to attract and trap attackers to study their behavior." },
    { term: "DMZ", tag: "Network", def: "Demilitarized Zone. A subnetwork that exposes external services to the internet while protecting the internal LAN." },
    { term: "Proxy Server", tag: "Tool", def: "Intermediary between a client and the internet, used for privacy or filtering." },
    { term: "Air Gap", tag: "Defense", def: "Physical isolation of a secure network from unsecured networks (like the internet)." },
    { term: "Sandbox", tag: "Defense", def: "Isolated environment for running suspect programs without risking the host OS." },
    { term: "Antivirus", tag: "Tool", def: "Software designed to detect and destroy computer viruses." },

    // --- CONCEPTS & CRYPTO ---
    { term: "CIA Triad", tag: "Concept", def: "Confidentiality, Integrity, Availability. The three pillars of information security." },
    { term: "Encryption", tag: "Crypto", def: "Encoding data so only authorized parties can read it." },
    { term: "Hashing", tag: "Crypto", def: "Turning data into a fixed-size string of characters. It is one-way (cannot be reversed)." },
    { term: "Salt", tag: "Crypto", def: "Random data added to a password before hashing to protect against rainbow tables." },
    { term: "Symmetric Key", tag: "Crypto", def: "Encryption where the same key is used for both encryption and decryption." },
    { term: "Asymmetric Key", tag: "Crypto", def: "Encryption using a pair of keys: Public (to encrypt) and Private (to decrypt)." },
    { term: "PKI", tag: "Crypto", def: "Public Key Infrastructure. Framework for managing digital certificates and public-key encryption." },
    { term: "SSH", tag: "Protocol", def: "Secure Shell. A protocol for operating network services securely over an unsecured network." },
    { term: "SSL/TLS", tag: "Protocol", def: "Protocols for establishing authenticated and encrypted links between networked computers." },
    { term: "Handshake", tag: "Protocol", def: "The process of negotiation between two parties to establish a connection." },
    { term: "Penetration Test", tag: "Job", def: "Simulated cyberattack against your computer system to check for exploitable vulnerabilities." },
    { term: "Red Team", tag: "Job", def: "The group responsible for simulating attacks (offense)." },
    { term: "Blue Team", tag: "Job", def: "The group responsible for defending against attacks (defense)." },
    { term: "Social Engineering", tag: "Attack", def: "Manipulating people into giving up confidential information." },
    { term: "Multi-Factor Auth", tag: "Defense", def: "Authentication requiring two or more pieces of evidence (Password + Phone Code)." },
    { term: "IoT", tag: "Concept", def: "Internet of Things. Physical objects with sensors/software that connect to the internet." },
    { term: "Botnet", tag: "Threat", def: "A network of private computers infected with malicious software and controlled as a group." }
];

// Sort alphabetically automatically
glossaryData.sort((a, b) => a.term.localeCompare(b.term));