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
  deskPath: { type: String, required: false },
  deskName: { type: String, required: false },
  equipPath: { type: String, required: false },
  equipment: [{ type: String, required: false }],
  id: { type: String, required: false },
  rotX: { type: Number, required: false },
  rotY: { type: Number, required: false },
  rotZ: { type: Number, required: false },
  scale: { type: Number, required: false },
  type: { type: String, enum: ["static", "desk"], required: false },
  x: { type: Number, required: false },
  y: { type: Number, required: false },
  z: { type: Number, required: false },
});

const floorRenderDataSchema = new mongoose.Schema<FloorRenderData>({
  color: { type: String, required: false },
  endX: { type: Number, required: false },
  endY: { type: Number, required: false },
  endZ: { type: Number, required: false },
  id: { type: String, required: false },
  x: { type: Number, required: false },
  y: { type: Number, required: false },
  z: { type: Number, required: false },
});

const elementRenderDataSchema = new mongoose.Schema<ElementRenderData>({
  id: { type: String, required: false },
  path: { type: String, required: false },
  rotX: { type: Number, required: false },
  rotY: { type: Number, required: false },
  rotZ: { type: Number, required: false },
  scale: { type: Number, required: false },
  type: { type: String, enum: ["static", "desk"], required: false },
  x: { type: Number, required: false },
  y: { type: Number, required: false },
  z: { type: Number, required: false },
});

const wallRenderDataSchema = new mongoose.Schema<WallRenderData>({
  color: { type: String, required: false },
  endX: { type: Number, required: false },
  endY: { type: Number, required: false },
  endZ: { type: Number, required: false },
  id: { type: String, required: false },
  x: { type: Number, required: false },
  y: { type: Number, required: false },
  z: { type: Number, required: false },
});

const officeSchema = new mongoose.Schema<OfficeData>({
  name: { type: String, required: false },
  address: { type: String, required: false },
  renderData: {
    deskData: [deskRenderDataSchema],
    floorData: [floorRenderDataSchema],
    elementData: [elementRenderDataSchema],
    wallData: [wallRenderDataSchema],
  },
  deskList: {
    deskId: { type: String, required: false },
    deskName: { type: String, required: false },
    equipment: [{ type: String }],
    reservationData: [
      {
        reservationId: { type: String, required: false },
        userId: { type: String, required: false },
        user: {
          name: { type: String, required: false },
          surname: { type: String, required: false },
        },
        startTime: { type: Date, required: false },
        endTime: { type: Date, required: false },
        createdAt: { type: Date, required: false },
      },
    ],
    active: { type: Boolean, default: true },
  },
  authorId: { type: String, required: false },
  users: [
    {
      name: { type: String, required: false },
      surname: { type: String, required: false },
    },
  ],
  invitationCode: { type: String, required: false },
});

export const OfficeModel = mongoose.model<OfficeData>("Office", officeSchema);
