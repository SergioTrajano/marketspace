import { useTheme } from "native-base";

export function closestSizeAcceptable(num: number) {
    const { sizes } = useTheme();
    const posibleSizesNumber: any[] = Object.keys(sizes).filter(
        (size) => isNaN(Number(size)) === false
    );

    let curr = posibleSizesNumber[0];
    let diff = Math.abs(num - curr);
    for (let size of posibleSizesNumber) {
        const newdiff = Math.abs(num - size);
        if (newdiff < diff) {
            diff = newdiff;
            curr = size;
        }
    }

    return curr;
}
