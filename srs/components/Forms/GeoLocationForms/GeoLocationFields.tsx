import {Input} from "@/srs/components/common/Input";
import {ErrorForm} from "@/srs/components/Forms/ErrorForms/FormError";
import React from "react";
import {Button} from "@/srs/components/common/Button";

interface Props {
    latitude: number
    longitude: number
    onChange: (field: 'latitude' | 'longitude', value: number) => void
    getLocation: () => void
    geoLoading: boolean
    geoError?: string | null
}

export const GeoLocationFields = ({ latitude, longitude, onChange, getLocation, geoLoading, geoError }: Props) => {
    return (
        <>
            <Button
                type="button"
                variant={"warning"}
                onClick={getLocation}
                className="text-sm"
                isDisabled={geoLoading}
            >
                {geoLoading ? 'Locating...' : 'Use my location'}
            </Button>

            {geoError && <ErrorForm message={geoError}/>}

            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="col-span-12 sm:col-span-6">
                    <Input
                        type="number"
                        label="Latitude"
                        value={latitude}
                        onChange={(val) => onChange('latitude', parseFloat(val))}
                    />
                </div>
                <div className="col-span-12 sm:col-span-6">
                    <Input
                        type="number"
                        label="Longitude"
                        value={longitude}
                        onChange={(val) => onChange('longitude', parseFloat(val))}
                    />
                </div>
            </div>
        </>
    )
}
