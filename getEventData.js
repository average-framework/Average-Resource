exports('GetEventEntityDamaged', (eventGroup, index, argStructSize) => {
    const buffer = new ArrayBuffer(256);
    const view = new DataView(buffer);

    Citizen.invokeNative("0x57EC5FA4D4D6AFCA", eventGroup, index, view, argStructSize, Citizen.returnResultAnyway());

    const intOut = new Int32Array(buffer)
    const floatOut = new Float32Array(buffer)

    var result = {
        damagedEntity: intOut[0],
        entityIdOwnerOfDamage: intOut[2],
        weaponHash: intOut[4],
        ammoHash: intOut[6],
        damageAmount: floatOut[8],
        unk1: intOut[8],
        coordX: floatOut[12],
        coordY: floatOut[14],
        coordZ: floatOut[16]
    }

    return result;
});