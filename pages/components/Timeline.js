
import '../style/timeline-style.css'
import TimelineItem from './TimelineItem'

const Timeline = (props) => (
    typeof props !== 'undefined' && typeof props.info !== 'undefined' &&
        props.info.length > 0 && (
        <div className="timeline-container col-12">
            {props.info.map((data, idx) => (
                <TimelineItem data={data} key={idx} />
            ))}
        </div>
    )
)

export default Timeline;
