declare module "react-json-to-table" {
    import * as React from "react";

    export interface JsonToTableProps {
        json: unknown;
    }

    export const JsonToTable: React.FC<JsonToTableProps>;
}
