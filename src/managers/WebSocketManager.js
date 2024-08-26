class WebSocketManager {

    constructor() {
        this.socket = null;
        this.contextUpdaters = {}
    }

    // Initialize WebSocket connection
    connect(userId, token, contextUpdaters = {}) {
        this.contextUpdaters = contextUpdaters;  // Store the context updaters

        if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {
            this.socket = new WebSocket(`ws://10.0.2.2:8000/ws/notifications/${userId}/?token=${token}`);

            this.socket.onopen = () => {
                console.log('WebSocket connected');
            };

            this.socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log('WebSocket message received:', data);
                this.handleNotification(data);
            };

            this.socket.onclose = () => {
                console.log('WebSocket closed');
            };

            this.socket.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
        }
    }

    // Close WebSocket connection
    disconnect() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }

    // Handle incoming notifications (you can update any context here)
    handleNotification(data) {
        if (data.notification) {
            if(data.notification.type == "new_message"){
                this.contextUpdaters.setHasNewMessage(true);
            }
            else if (data.notification.type == "friend_request"){
                console.log("fr")
                this.contextUpdaters.setHasNewFR(true);
            }
            console.log('Handling notification:', data.notification);
        }
    }

    // Send a message to the WebSocket server
    sendMessage(message) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
        } else {
            console.error('WebSocket is not open');
        }
    }
}

const webSocketManager = new WebSocketManager();
export default webSocketManager;
