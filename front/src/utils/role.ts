export default class Role {

    static ADMINISTRATOR = "Administrateur"
    static SCHOOL =    "Ecole"
    static JURY =      "Jury"
    static REGULATOR = "Autorité de régulation"
    static CORRECTOR =   "Correcteur"
    static STUDENT = "Etudiant"

    roles: string[]

    constructor(roles: string[]) {
        this.roles = roles
    }

    isAdmin(): boolean {
        return this.roles.includes(Role.ADMINISTRATOR)
    }

    isSchool(): boolean {
        return this.roles.includes(Role.SCHOOL)
    }

    isJury(): boolean {
        return this.roles.includes(Role.JURY)
    }

    isRegulator(): boolean {
        return this.roles.includes(Role.REGULATOR)
    }

    isCorrector(): boolean {
        return this.roles.includes(Role.CORRECTOR)
    }

    isStudent(): boolean {
        return this.roles.includes(Role.STUDENT)
    }
}