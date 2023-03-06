import { MdTrain, MdTram } from 'react-icons/md';
import { IoMdBus, IoMdBoat } from 'react-icons/io';
import { useSelector } from 'react-redux';

export default function Form() {

    const { infos } = useSelector(state=>state);

    function getTransportIcon(transportModeCode) {
        switch (transportModeCode) {
            case 'bus':
                return < IoMdBus />;
            case 'tram':
                return <MdTram />;
            case 'train':
                return <MdTrain />;
            case 'boat':
                return <IoMdBoat />
            default:
                return null;
        }
    }
    return (
        <div className="results-section">
            <div className="results w-50 m-auto">
                {
                    infos?.trafficInfos && (
                        <h3 className="text-center mb-5">{infos?.trafficInfos.length} ongoing traffic disruptions</h3>
                    )
                }
                {
                    infos?.trafficInfos && infos?.trafficInfos.map((info, index) => (
                        <div key={index} className="card p-3 mb-3">
                            {info.affectedLines.length > 0 && (
                               <p>
                               { getTransportIcon(info.affectedLines[0]?.defaultTransportModeCode) } {" "}
                               { info.affectedLines.length > 0 ? info.affectedLines.map((line, index) =>(
                                    <span key={index}>{ index!==0 && ", " }{ line.name ?(<span className="line">{line.name}</span>): <span>{line.designation}</span>}</span>
                               )): "information" }</p>
                            )}
                            <p className="fst-italic small">uppdaterad:{" "}{new Date(info.creationTime).toLocaleString("sv-SE", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                            })} </p>
                            <p>{info.title}</p>
                            <p>{info.description}</p>
                            <div className="small">Gäller från:{" "}
                                {new Date(info.startTime).toLocaleString("sv-SE", {
                                    month: "long",
                                    day: "numeric",
                                    weekday: "long",
                                })}{" "}
                                -{" "}
                                {new Date(info.endTime).toLocaleString("sv-SE", {
                                    month: "long",
                                    day: "numeric",
                                    weekday: "long",
                                })}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
