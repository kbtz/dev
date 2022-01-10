import { TimeUtils } from '+time'
declare global {

	const after: TimeUtils['after']
	const every: TimeUtils['every']
	const sleep: TimeUtils['sleep']
}