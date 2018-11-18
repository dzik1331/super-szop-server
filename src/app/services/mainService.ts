export class MainService {
    public dataToString(data) {
        if (!data)
            return null;
        else
            return `'${data}'`;

    }
}