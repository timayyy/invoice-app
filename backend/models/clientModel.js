import mongoose from "mongoose";

const clientSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        streetAddress: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        zipCode: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Client = mongoose.model("Client", clientSchema);

export default Client;