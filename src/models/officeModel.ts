import mongoose from "mongoose";

interface OfficeData {
  id: string;
  name: string;
  address: string;
  renderData: OfficeRenderData;
  deskList: Desks;
  authorId: string;
  users: { name: string; surname: string }[];
  invitationCode: string;
}

type DeskRenderData = {
  deskPath: string;
  deskName: string;
  equipPath: string;
  equipment: string[];
  id: string;
  rotX: number;
  rotY: number;
  rotZ: number;
  scale: number;
  type: "static" | "desk";
  x: number;
  y: number;
  z: number;
};

type FloorRenderData = {
  color: string;
  endX: number;
  endY: number;
  endZ: number;
  id: string;
  x: number;
  y: number;
  z: number;
};

type ElementRenderData = {
  id: string;
  path: string;
  rotX: number;
  rotY: number;
  rotZ: number;
  scale: number;
  type: "static" | "desk";
  x: number;
  y: number;
  z: number;
};

type WallRenderData = {
  color: string;
  endX: number;
  endY: number;
  endZ: number;
  id: string;
  x: number;
  y: number;
  z: number;
};

type OfficeRenderData = {
  deskData: DeskRenderData[];
  floorData: FloorRenderData[];
  elementData: ElementRenderData[];
  wallData: WallRenderData[];
};

type ReservationData = {
  reservationId: string;
  userId: string;
  user: { name: string; surname: string };
  startTime: Date;
  endTime: Date;
  createdAt: Date;
};

type Desks = {
  deskId: string;
  deskName: string;
  equipment: string[];
  reservationData: ReservationData[];
  active: boolean;
};

const deskRenderDataSchema = new mongoose.Schema<DeskRenderData>({
  deskPath: { type: String, required: true },
  deskName: { type: String, required: true },
  equipPath: { type: String, required: true },
  equipment: [{ type: String, required: true }],
  id: { type: String, required: true },
  rotX: { type: Number, required: true },
  rotY: { type: Number, required: true },
  rotZ: { type: Number, required: true },
  scale: { type: Number, required: true },
  type: { type: String, enum: ["static", "desk"], required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  z: { type: Number, required: true },
});

const floorRenderDataSchema = new mongoose.Schema<FloorRenderData>({
  color: { type: String, required: true },
  endX: { type: Number, required: true },
  endY: { type: Number, required: true },
  endZ: { type: Number, required: true },
  id: { type: String, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  z: { type: Number, required: true },
});

const elementRenderDataSchema = new mongoose.Schema<ElementRenderData>({
  id: { type: String, required: true },
  path: { type: String, required: true },
  rotX: { type: Number, required: true },
  rotY: { type: Number, required: true },
  rotZ: { type: Number, required: true },
  scale: { type: Number, required: true },
  type: { type: String, enum: ["static", "desk"], required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  z: { type: Number, required: true },
});

const wallRenderDataSchema = new mongoose.Schema<WallRenderData>({
  color: { type: String, required: true },
  endX: { type: Number, required: true },
  endY: { type: Number, required: true },
  endZ: { type: Number, required: true },
  id: { type: String, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  z: { type: Number, required: true },
});

const officeSchema = new mongoose.Schema<OfficeData>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  renderData: {
    deskData: [deskRenderDataSchema],
    floorData: [floorRenderDataSchema],
    elementData: [elementRenderDataSchema],
    wallData: [wallRenderDataSchema],
  },
  deskList: {
    deskId: { type: String, required: true },
    deskName: { type: String, required: true },
    equipment: [{ type: String }],
    reservationData: [
      {
        reservationId: { type: String, required: true },
        userId: { type: String, required: true },
        user: {
          name: { type: String, required: true },
          surname: { type: String, required: true },
        },
        startTime: { type: Date, required: true },
        endTime: { type: Date, required: true },
        createdAt: { type: Date, required: true },
      },
    ],
    active: { type: Boolean, default: true },
  },
  authorId: { type: String, required: true },
  users: [
    {
      name: { type: String, required: true },
      surname: { type: String, required: true },
    },
  ],
  invitationCode: { type: String, required: true },
});

export const OfficeModel = mongoose.model<OfficeData>("Office", officeSchema);
