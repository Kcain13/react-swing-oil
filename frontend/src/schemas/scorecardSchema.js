import * as Yup from 'yup';

const holeSchema = Yup.object().shape({
    score: Yup.number().required('Required').min(1, 'Minimum score is 1').max(15, 'Maximum score is 15'),
    fairway_hit: Yup.boolean(),
    green_in_regulation: Yup.boolean(),
    putts: Yup.number().required('Required').min(0, 'Minimum putts is 0'),
    bunker_shots: Yup.number().min(0, 'Minimum bunker shots is 0'),
    penalties: Yup.number().min(0, 'Minimum penalties is 0'),
});

const ScorecardSchema = Yup.object().shape({
    holes: Yup.array().of(holeSchema).required('At least 9 holes must be entered').min(9).max(18),
});

export default ScorecardSchema;
