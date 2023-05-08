import CookieService, { Cookie } from "../../../Services/CookieService";
import { ConditionInfo, EventDTO, MoveDTO, RuleSetDTO } from "./Types";


var token = CookieService.getInstance().get(Cookie.JwtToken)

export async function getPredicates(token: string): Promise<ConditionInfo[]> {

    return fetch(process.env.REACT_APP_BACKEND_BASE_URL + "api/predicate", {
        method: "GET",
        headers: {
            'Accept': "application/json",
            'Authorization': `Bearer ${token}`,
        },
    }).then(o => o.json().then(o => o.predicates));

}

export async function getExceptionMessage(code: string): Promise<string> {

    return fetch(process.env.REACT_APP_BACKEND_BASE_URL + "api/parser", {
        method: "POST",
        headers: {
            'Accept': "application/json",
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json",
        },
        body: JSON.stringify({ code: code }),
    }).then(o => o.json().then(o => o.exception));

}

export async function getRulesets(): Promise<RuleSetDTO[]> {

    return fetch(process.env.REACT_APP_BACKEND_BASE_URL + "api/ruleset", {
        method: "GET",
        headers: {
            'Accept': "application/json",
            'Authorization': `Bearer ${token}`,
        },
    }).then(o => o.json().then(o => o.ruleSets));

}

export function postItem(controller: string, jsonObject: Object) {
    fetch(process.env.REACT_APP_BACKEND_BASE_URL + "api/" + controller, {
        method: "POST",
        headers: {
            'Accept': "application/json",
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json",
        },
        body: JSON.stringify(jsonObject),
    }).then(o => console.log(o));
    console.log("Posting: " + JSON.stringify(jsonObject));
}

export function deleteItem(controller: string, itemToDelete: string) {
    fetch(process.env.REACT_APP_BACKEND_BASE_URL + "api/" + controller + "/" + itemToDelete, {
        method: "DELETE",
        headers: {
            'Accept': "application/json",
            'Authorization': `Bearer ${token}`,
            'Content-Type': "application/json",
        },
    });
}

export async function getEvents(): Promise<EventDTO[]> {

    return fetch(process.env.REACT_APP_BACKEND_BASE_URL + "api/event", {
        method: "GET",
        headers: {
            'Accept': "application/json",
            'Authorization': `Bearer ${token}`,
        },
    }).then(o => o.json().then(o => o.events));
}
export async function getMoves(): Promise<MoveDTO[]> {

    return fetch(process.env.REACT_APP_BACKEND_BASE_URL + "api/move", {
        method: "GET",
        headers: {
            'Accept': "application/json",
            'Authorization': `Bearer ${token}`,
        },
    }).then(o => o.json().then(o => o.moves));

}

export async function updateDict<T extends { name: string }>(getFunction: (token: string) => Promise<T[]>, setFunction: (dict: { [name: string]: T }) => void) {

    type TDict = { [name: string]: T }
    const rulesetsTemp: T[] = (await getFunction(token));

    let ruleSetDict: TDict = {};
    rulesetsTemp.map((item) => {
        ruleSetDict[item.name] = item
    })

    setFunction(ruleSetDict)
}

export function isIdentifier(inputValue: string) {
    const regex = /^[a-zA-Z]+$/i;

    return regex.test(inputValue) && inputValue.length <= 15;
}

export function handleChangeIdentifier(event: React.ChangeEvent<HTMLInputElement>, setFunc: ((value: React.SetStateAction<string>) => void) | ((value: string) => void)) {
    const { value: inputValue } = event.target;
    if (inputValue == "" || isIdentifier(inputValue)) {
        setFunc(inputValue);
    }
};