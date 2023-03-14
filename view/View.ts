import { default as Emitter } from '../event/Emitter';

export default class View extends cc.Component {
    protected static emitter = Emitter.inst()
}
