import ncbi from "./ncbi";
import embl from "./embl-ebi";
import { mapRequest } from "../utils/request";

module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("emit_search", (query) => {
      ncbi.startNCBI(query, socket);
      embl.startEMBL(query, socket);
    });
    socket.on("get_genome", async (item) => {
      const genome = await mapRequest(item.samples, item.bd.toLowerCase());
      socket.emit("returngenome", { genome });
    });
    socket.on("disconnect", function (err) {
      console.log("Socket is disconnected.", err, ', socket id: ', socket.id);
    });
  });
};
