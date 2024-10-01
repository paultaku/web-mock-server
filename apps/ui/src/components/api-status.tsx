import React, { useEffect } from 'react';
import style from './api-status.module.css';

interface ApiStatusProps {
  api: string;
  index: number;
}

export function ApiStatus(props: ApiStatusProps) {
  useEffect(() => {
    console.log('ApiStatus rendered');
  }, []);

  return (
    <div
      key={props.index}
      className="collapse collapse-arrow collapse-open bg-base-200"
      tabIndex={props.index}
    >
      <div className="text-xl font-medium collapse-title">{props.api}</div>
      <div className="collapse-content">
        <ul>
          <li className={style['api-selection']}>
            <input type="radio" name="apiSelection" value={props.api} />
            <span>success.json</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
